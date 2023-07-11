class Model {
  constructor({ onMemesChanged, onMemesApiChanged }) {
    this.memes = [];
    this.isError = false;
    this.onMemesChanged = onMemesChanged;
    this.onMemesApiChanged = onMemesApiChanged;
  }

  addMeme(top, bottom, select) {
    const id = select.options[select.selectedIndex].id;
    const name = select.options[select.selectedIndex].value;
    const selectedMeme = this.memesApi.find((meme) => meme.id === id);
    const url = selectedMeme ? selectedMeme.url : "";

    if (this._isMemeValid(top, bottom, select)) {
      this.isError = false;

      this.memes.push({
        top,
        bottom,
        id,
        name,
        url,
      });
    } else {
      this.isError = true;
    }

    this.onMemesChanged(this.memes, this.isError);
  }

  setMemesApi(memesApi) {
    this.memesApi = memesApi;
    this.onMemesApiChanged(this.memesApi);

  }

  _isMemeValid(top, bottom, select) {
    return top !== "" && bottom !== "" && select !== null;
  }
}