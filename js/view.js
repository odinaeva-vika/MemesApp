class View {
  constructor({ onNewMeme }) {
    this.memesNode = document.getElementById("boxText");
    this.inputTopNode = document.getElementById("inputTop");
    this.inputBottomNode = document.getElementById("inputBottom");
    this.selectNode = document.getElementById("select");
    this.errorNode = document.getElementById("error");

    this.onNewMeme = onNewMeme;

    this.selectNode.addEventListener("change", this._handleValueChange);
    this.inputTopNode.addEventListener("change", this._handleValueChange);
    this.inputBottomNode.addEventListener("change", this._handleValueChange);
  }

  initValues() {
    this._handleValueChange();
  }

  renderSelect(memesApi) {
    this.selectNode.innerHTML = memesApi
      .map((meme) =>
        `<option id="${meme.id}" value="${meme.name}" data-url="${meme.url}">${meme.name}</option>`
      )
      .join("");
  }

  render(memes, isError) {
    this.errorNode.innerText = isError ? "Заполните поля" : "";

    this.memesNode.innerHTML = "";

    memes.forEach((meme) => {
      this.memesNode.innerHTML = `
        <img src="${meme.url}" alt="${meme.name}"></img>
        <div class="box__text">
          <div>${meme.top}</div>
          <div>${meme.bottom}</div>
        </div>
      `;
    });
  }

  _handleValueChange = () => {
    const top = this.inputTopNode.value;
    const bottom = this.inputBottomNode.value;
    const select = this.selectNode;

    this.onNewMeme(top, bottom, select);
  }
}
