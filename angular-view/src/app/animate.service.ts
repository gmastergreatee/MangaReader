export class AnimateService {
    showChapters() {
        document.getElementById('chap-view').style.width = '300px';
        document.getElementById('img-view').style.left = '303px';
        setTimeout(() => {
            document.getElementById('bottom-arrow-left').style.right = '0px';
            document.getElementById('bottom-arrow-left').style.transform = 'rotate(0deg)';
        }, 250);
    }

    hideChapters() {
        document.getElementById('chap-view').style.width = '5px';
        document.getElementById('img-view').style.left = '8px';
        setTimeout(() => {
            document.getElementById('bottom-arrow-left').style.right = '-34px';
            document.getElementById('bottom-arrow-left').style.transform = 'rotate(180deg)';
        }, 250);
    }

    setHeightMode() {
        document.getElementById('widthHeightImage').style.transform = 'rotate(90deg)';
    }

    setWidthMode() {
        document.getElementById('widthHeightImage').style.transform = 'rotate(0deg)';
    }

    ForceChangeDetection() {
        document.getElementById('bottom-arrow-left').click();
        document.getElementById('bottom-arrow-left').click();
    }
}
