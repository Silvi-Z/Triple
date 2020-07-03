import React, { Component } from "react"
import i18next from "./config"
import { I18nextProvider, withTranslation } from "react-i18next"

export function withTrans(WrappedComponent) {
  WrappedComponent = withTranslation()(WrappedComponent)

  return class extends Component {
    render() {
      const url = this.props.location.search
      const pos = url.indexOf("=")

      const lng = url.substr(pos + 1)

      console.log("window.location", lng)
      i18next.changeLanguage(lng, (err, t) => {
        if (err) return console.log("something went wrong loading", err)
        t("key") // -> same as i18next.t
      })
      console.log("this.props", this.props)
      return (
        <I18nextProvider i18n={i18next}>
          <WrappedComponent {...this.props} language={i18next.language} />
        </I18nextProvider>
      )
    }
  }
}
