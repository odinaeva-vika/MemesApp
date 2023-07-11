class Controller {
  constructor() {
    this.model = new Model({
      onMemesChanged: this.handleModelMemesChanged,
      onMemesApiChanged: this.handleModelMemesApiChanged,
    });

    this.view = new View({
      onNewMeme: this.handleViewNewMeme.bind(this),
    });

    this.api = new API();
  }

  init() {
    this.api
      .fetchMemes()
      .then((memes) => {
        this.model.setMemesApi(memes);
      })
      .catch((error) => {
        console.log("Ошибка при загрузке мемов:", error);
      });
  }

  handleModelMemesChanged = (memes, isError) => {
    this.view.render(memes, isError);
  }

  handleModelMemesApiChanged = (memesApi) => {
    this.view.renderSelect(memesApi);
    this.view.initValues(); // Вызовем метод initValues для отображения начальных значений
  }

  handleViewNewMeme = (top, bottom, memesApi) => {
    this.model.addMeme(top, bottom, memesApi);
  }
}