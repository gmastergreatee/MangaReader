class Chapter {

    get Name() {
        return this.name;
    }

    set Name(value = '') {
        this.name = value;
    }

    get imageList() {
        return this.imagelist;
    }

    set imageList(value = ['']) {
        this.imagelist = value;
    }

    constructor(name = '', imageList = ['']) {
        this.name = name;
        this.imagelist = imageList;
    }
}

module.exports = Chapter;