import '@babel/polyfill';
import '_polyfills';
import './init-icons';
import { ThemeStore } from './theme';

/**
 * Asynchronously load the theme store.
 */
export async function loadThemeStore(): Promise<ThemeStore> {
  const themeModule = await import(/*
    webpackPreload: true,
    webpackChunkName: "theme"
   */ './theme');
  return themeModule.themeStore;
}
/**
 * Asynchronously load the i18n module.
 */
export function loadI18n() {
  return import(/*
    webpackPrefetch: true,
    webpackChunkName: "i18n"
   */ './i18n');
}

/**
 * Asynchronously load the dialog module.
 */
export function loadDialog() {
  return import(/*
    webpackPrefetch: true,
    webpackChunkName: "dialog"
   */ './dialog');
}

/**
 * Asynchronously load the game-start-control module.
 */
export function loadGameStartControl() {
  return import(/*
    webpackChunkName: "game-start-control"
  */ './pages/game-start-control');
}

/**
 * Asynchronously load the game-view module.
 */
export function loadGameView() {
  return import(/*
    webpackChunkName: "game-view"
  */ './pages/game-view');
}

/**
 * Asynchronoulsly load the user settings module.
 */
export function loadUserSettings() {
  return import(/*
    webpackChunkName: "user-settings"
  */ './pages/user-settings');
}

/**
 * Asynchronously load the manual module.
 */
export function loadManual() {
  return import(/* webpackMode: "eager"*/ './manual');
}

/**
 * Asynchronously load the sever-connection module.
 */
export function loadServerConnection() {
  return import(/*
    webpackPrefetch: true,
    webpackChunkName: "server-connection-info"
   */ './pages/server-connection-info');
}

/**
 * Asynchronously load the roomlist module.
 */
export function loadRoomList() {
  return import(/*
    webpackPrefetch: true,
    webpackChunkName: "room-list"
    */ './pages/room-list');
}
