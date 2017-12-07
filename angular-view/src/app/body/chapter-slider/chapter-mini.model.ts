/**
 * Class to be used by the Chapter-slider on the left
 */
export class ChapterMiniView {
    constructor(public name: string, public Id: number, public startId: number, public endId: number) { }

    getChapterName(): string {
        if (this.name.length <= 4) {
            return 'Chapter ' + this.name;
        } else {
            return this.name;
        }
    }
}
