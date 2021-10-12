import type { DataContext } from '..'
import type { AuthenticatedUserShape } from '../data'

interface AuthMessage {type: string, browserOpened: boolean, name: string, message: string}
export interface AuthApiShape {
  logIn(onMessage: (message: AuthMessage) => void): Promise<AuthenticatedUserShape>
  logOut(): Promise<void>
  checkAuth(context: DataContext): Promise<void>
}

export class AuthActions {
  constructor (private ctx: DataContext) {}

  get authApi () {
    return this.ctx._apis.authApi
  }

  async checkAuth () {
    return this.authApi.checkAuth(this.ctx)
  }

  async login () {
  async login () {
    this.setAuthenticatedUser(await this.authApi.logIn(({ browserOpened } ) => {
      this.ctx.appData.isAuthBrowserOpened = browserOpened
    }))
  }
  }

  async logout () {
    try {
      this.ctx.appData.isAuthBrowserOpened = false
      await this.authApi.logOut()
    } catch {
      //
    }
    this.setAuthenticatedUser(null)
  }

  private setAuthenticatedUser (authUser: AuthenticatedUserShape | null) {
    this.ctx.coreData.user = authUser

    return this
  }
}
