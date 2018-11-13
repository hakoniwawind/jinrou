import styled from '../../util/styled';
import { AppStyling } from '../../styles/phone';

/**
 * Wrapper of whole app.
 * @package
 */
export const Wrapper = styled(AppStyling)`
  padding: 0 20px;
`;
/**
 * Wrapper of room list.
 * @package
 */
export const RoomListWrapper = styled.div`
  width: fit-content;
`;

/**
 * Wrapper of one room.
 * @package
 */
export const RoomWrapper = styled.div`
  position: relative;
  left: 0;
  top: 0;
  margin: 0.3em 0;
  padding: 0.8em;
  box-shadow: 3px 3px 8px #888888;
`;

/**
 * Name of room.
 * @package
 */
export const RoomName = styled.a`
  display: block;
  margin: 0 0.2em 0.2em 0;
  word-break: break-all;
  font-size: 1.1em;
  text-decoration: none;

  /* expand link to whole box. */
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
`;

/**
 * Status texts.
 * @package
 */
export const Status = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 0.2em 0 0 0;
  font-size: 0.9em;
  color: #666666;
`;

/**
 * Common style of status tip.
 */
export const StatusTip = styled.span`
  flex: auto 0 0;
  margin: 0 0.4em;
`;

/**
 * Room status components
 */
export const roomStatus = {
  waiting: styled(StatusTip)`
    color: #ff3333;
  `,
  playing: styled(StatusTip)`
    color: #4444ff;
  `,
  end: styled(StatusTip)`
    color: #777777;
  `,
};

/**
 * Locked room
 */
export const Locked = styled(StatusTip)`
  color: #a58a00;
`;

/**
 * Has GM mark
 */
export const HasGM = StatusTip;

/**
 * Blind mode mark
 */
export const Blind = StatusTip;

/**
 * Wrapper of room owner part
 */
export const RoomOwner = styled(StatusTip)`
  a {
    /* needed to make owner link clickable */
    position: relative;
    /* give some space to the link */
    padding: 0.3em;
  }
`;

/**
 * Wrapper of room opem time
 */
export const RoomOpenTime = styled(StatusTip)`
  flex-basis: 22ex;
`;

/**
 * Wrapper of room commentk
 */
export const Comment = styled(StatusTip)`
  flex-shrink: 1;
  word-break: break-all;
`;
