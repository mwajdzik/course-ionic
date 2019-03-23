export class SettingsService {

  private altBackground = false;

  public setBackground(alt: boolean) {
    this.altBackground = alt;
  }

  public isAltBackground(): boolean {
    return this.altBackground;
  }
}
