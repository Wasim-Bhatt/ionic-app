/**
 * Singleton to show and dismiss a loader
 */

import { Injectable } from "@angular/core"
import { LoadingController } from "@ionic/angular"

@Injectable({
  providedIn: "root"
})
export class LoaderService {
  isLoading = false

  constructor(public loadingController: LoadingController) {}

  async present(message: string) {
    this.isLoading = true
    return await this.loadingController
      .create({
        mode: "md",
        message: message
      })
      .then((a) => {
        a.present().then(() => {
          if (!this.isLoading) {
            a.dismiss().then(() => {})
          }
        })
      })
  }

  async dismiss() {
    this.isLoading = false
    return await this.loadingController.dismiss().then(() => {})
  }
}
