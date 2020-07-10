import 'alpinejs'
import '@leanix/reporting'
import 'tailwindcss/tailwind.css'

const state = {
  baseUrl: '',
  status: null,
  body: null
}

const methods = {
  async initializeReport () {
    const reportSetup = await lx.init()
    const { settings } = reportSetup
    const { baseUrl } = settings
    this.baseUrl = baseUrl
    const config = {}
    lx.ready(config)
  },
  async executeRequest () {
    const url = new URL(this.baseUrl)
    url.pathname = '/services/webhooks/v1/subscriptions'
    try {
      lx.showSpinner()
      const { status, body } =  await lx.executeParentOriginXHR('GET', url.href)
      this.status = status
      this.body = body
    } catch (err) {
      console.error(err)
    } finally {
      lx.hideSpinner()
    }
  }
}

window.initializeContext = () => ({
  ...state,
  ...methods
})