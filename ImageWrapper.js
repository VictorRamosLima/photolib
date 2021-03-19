class ImageWrapper {
  constructor(imageUrl, imageId) {
    this._imageUrl = imageUrl;
    this._imageId = imageId;
    this._isActive = true;
    this._annotation = '';
    this._isFavorite = false;
    this._isAnnotable = false;
  }

  get imageId() {
    return this._imageId;
  }

  get elementId() {
    return `image-${this._imageId}`;
  }

  get imageUrl() {
    return this._imageUrl;
  }

  set imageUrl(imageUrl) {
    this._imageUrl = imageUrl;
  }

  get isActive() {
    return this._isActive;
  }

  set isActive(isActive) {
    this._isActive = isActive;
  }

  get annotation() {
    return this._annotation;
  }

  set annotation(annotation) {
    this._annotation = annotation;
  }

  get isFavorite() {
    return this._isFavorite;
  }

  set isFavorite(isFavorite) {
    this._isFavorite = isFavorite;
  }

  get isAnnotable() {
    return this._isAnnotable;
  }

  set isAnnotable(isAnnotable) {
    this._isAnnotable = isAnnotable;
  }

  renderImage() {
    const img = document.createElement('img');

    img.setAttribute('src', this._imageUrl);
    img.alt = `Image ${this._imageId}`;
    img.style.width = "400px";

    return img;
  }

  actions() {
    const div = document.createElement('div');
    div.classList.add('inner-actions-div');

    div.setAttribute('element-id', this.elementId);

    div.innerHTML = `
      ${this._isFavorite ?
        '<a class="image-action js-unfavorite">Desfavoritar</a>' :
        '<a class="image-action js-favorite">Favoritar</a>'
      }
      <a class="image-action js-create-annotation">Anotar</a>
      <a class="image-action js-remove">Remover</a>
      <div class="break-paragraph-line">
        <div
          element-id="${this.elementId}"
          class="${this._isAnnotable ? '' : 'js-not-active' } annotation-space"
        >
          <textarea class="annotation-text">${this._annotation}</textarea>
          <button class="image-action js-save-button">
            Salvar
          </button>
        </div>
        <p>${this._annotation}</p>
      </div>
    `;

    return div;
  }

  renderActions() {
    const div = document.createElement('div');
    div.classList.add('image-actions');

    return div;
  }

  render() {
    const div = document.createElement('div');

    if (this._isActive) {
      const renderedActions = this.renderActions();
      div.id = this.elementId;
      div.classList.add('image-item');

      div.appendChild(this.renderImage());
      renderedActions.appendChild(this.actions())
      div.appendChild(renderedActions);
    } else {
      div.classList.add('js-not-active');
    }

    return div;
  }
}
