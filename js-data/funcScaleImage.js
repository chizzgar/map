function scaleImage(targetEl, imageUrl) {
    let modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.left = 0;
    modal.style.top = 0;
    modal.style.bottom = 0;
    modal.style.right = 0;
    modal.style.background = 'rgba(0,0,0,0.5)';
    modal.style.zIndex = 100;
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.flexDirection = 'column';
    modal.style.alignItems = 'center';
  
    let div = document.createElement('div');
    div.style.width = '50%';
    div.style.height = '80%';
    div.style.textAlign = 'center';
    let img = document.createElement('img');
    if (targetEl.tagName === 'IMG') {
      img.src = targetEl.src;
    } else {
      img.src = targetEl.style.backgroundImage.slice(5, -2);
    }
    img.style.maxWidth = '100%';
    img.style.maxHeight = '100%';
  
    div.append(img);
    modal.append(div);
    let close = document.createElement('div');
    close.style.width = '25px';
    close.style.height = '25px';
    close.style.marginLeft = 'calc(100% - 25px)';
    close.style.cursor = 'pointer';
  
    close.style.backgroundImage = `url(${imageUrl})`;
    div.append(close);
    document.body.style.overflow = 'hidden';
    modal.addEventListener('click', () => {
      modal.remove();
      document.body.style.overflow = 'visible';
    });
    document.body.append(modal);
  }
  
  export default scaleImage;