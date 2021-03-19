class ImageLibrary {
  constructor() {
    this.photoLibraryElement = document.querySelector('#js-photo-library');
  }

  async load() {
    const response = await fetch('https://picsum.photos/v2/list?page=1&limit=30');
    const images = await response.json();

    const imagesElements = images.map(
      image => new ImageWrapper(image.download_url, image.id)
    );

    this.render(imagesElements);

    return imagesElements;
  }

  render(imagesElements) {
    this.photoLibraryElement.innerHTML = '';

    imagesElements.forEach(
      imageElement => this.photoLibraryElement.appendChild(imageElement.render())
    );
  }

  renderActions(imageElement) {
    const htmlImage = document.querySelector(`#${imageElement.elementId}`);
    const annotation = htmlImage.querySelector('.annotation-text').value;

    imageElement.annotation = annotation;

    const actions = imageElement.actions();

    if (!imageElement.isActive) {
      htmlImage.classList.add('js-not-active');
    } else {
      const imageActions = htmlImage.querySelector('.image-actions');
      imageActions.innerHTML = '';
      imageActions.appendChild(actions);
    }
  }
}
