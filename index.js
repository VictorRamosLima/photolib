const getElementId = target => target.parentNode.getAttribute('element-id');

const getImageId = target => getElementId(target).split('-')[1];

const isElement = (target, className) => target.classList.contains(className);

const isImageAction = target => isElement(target, 'image-action');

const mountPage = async () => {
  const imageLibrary = new ImageLibrary();
  const imagesElements = await imageLibrary.load();

  document.querySelector('#js-photo-library').addEventListener('click', event => {
    event.stopPropagation();

    const target = event.target;

    if (isImageAction(target)) {
      const id = getImageId(target);

      const isFavoriteAction = isElement(target, 'js-favorite');
      const isUnfavoriteAction = isElement(target, 'js-unfavorite');
      const isRemoveAction = isElement(target, 'js-remove');
      const isCreateAnnotationAction = isElement(target, 'js-create-annotation');
      const isSaveAnnotationButton = isElement(target, 'js-save-button');

      const index = imagesElements.findIndex(imageElement => imageElement.imageId === id);
      const imageElement = imagesElements[index];

      if (isFavoriteAction) {
        imageElement.isFavorite = true;
      } else if (isUnfavoriteAction) {
        imageElement.isFavorite = false;
      } else if (isRemoveAction) {
        imageElement.isActive = false;
      } else if (isCreateAnnotationAction) {
        imageElement.isAnnotable = true;
      } else if (isSaveAnnotationButton) {
        imageElement.isAnnotable = false;
      }

      imageLibrary.renderActions(imageElement);
    }
  });
};

document.querySelector('#js-fetch-images').addEventListener('click', function() {
  mountPage();
  this.classList.add('js-not-active');
});
