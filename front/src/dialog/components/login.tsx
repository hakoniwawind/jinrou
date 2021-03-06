import * as React from 'react';
import { bind } from '../../util/bind';

import { ILoginDialog } from '../defs';

import { Dialog } from './base';
import {
  YesButton,
  NoButton,
  FormTable,
  FormInput,
  FormControlWrapper,
  FormErrorMessage,
  FormAsideText,
} from './parts';
import { I18n, TranslationFunction } from '../../i18n';

export interface IPropLoginDialog extends ILoginDialog {
  onClose(ok: boolean): void;
}
export interface IStateLoginDialog {
  error: string | null;
}

/**
 * Login Dialog.
 */
export class LoginDialog extends React.PureComponent<
  IPropLoginDialog,
  IStateLoginDialog
> {
  private useridRef: React.RefObject<HTMLInputElement> = React.createRef();
  private passwordRef: React.RefObject<HTMLInputElement> = React.createRef();
  state: IStateLoginDialog = {
    error: null,
  };
  public render() {
    const { modal } = this.props;
    const { error } = this.state;

    return (
      <I18n namespace="common">
        {t => {
          const title = t('loginForm.title');
          const ok = t('loginForm.ok');
          const cancel = t('loginForm.cancel');
          return (
            <Dialog
              icon="user"
              modal={modal}
              title={title}
              onCancel={this.handleCancel}
              message=""
              form={true}
              onSubmit={this.handleSubmit(t)}
              contents={() => (
                <>
                  <FormTable>
                    <tbody>
                      <tr>
                        <th>{t('loginForm.userid')}</th>
                        <td>
                          <FormInput
                            innerRef={this.useridRef}
                            autoComplete="username"
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>{t('loginForm.password')}</th>
                        <td>
                          <FormInput
                            innerRef={this.passwordRef}
                            type="password"
                            autoComplete="current-password"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </FormTable>
                  {error != null ? (
                    <FormErrorMessage>{error}</FormErrorMessage>
                  ) : null}
                </>
              )}
              buttons={() => (
                <>
                  <NoButton type="button" onClick={this.handleCancel}>
                    {cancel}
                  </NoButton>
                  <YesButton>{ok}</YesButton>
                </>
              )}
              afterButtons={() => (
                <FormAsideText>
                  <a href="/" onClick={this.handleCancel}>
                    {t('loginForm.signup')}
                  </a>
                  {'　'}
                  <a href="/manual/login" target="_blank">
                    {t('loginForm.help')}
                  </a>
                </FormAsideText>
              )}
            />
          );
        }}
      </I18n>
    );
  }
  public componentDidMount() {
    // focus on a close button
    if (this.useridRef.current != null) {
      this.useridRef.current.focus();
    }
  }
  @bind
  protected handleCancel() {
    this.props.onClose(false);
  }
  protected handleSubmit(t: TranslationFunction) {
    return (e: React.SyntheticEvent<any>) => {
      e.preventDefault();
      // Run login api.
      const {
        useridRef,
        passwordRef,
        props: { login, onClose },
      } = this;
      if (useridRef.current == null || passwordRef.current == null) {
        return;
      }
      login(useridRef.current.value, passwordRef.current.value)
        .then(loggedin => {
          if (loggedin) {
            // succeeded to login.
            onClose(true);
          } else {
            this.setState({
              error: t('loginForm.error'),
            });
          }
        })
        .catch(err => {
          this.setState({
            error: String(err),
          });
        });
    };
  }
}
