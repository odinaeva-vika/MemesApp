class API {
  constructor() {
    this.baseUrl = 'https://api.imgflip.com';
  }

  async fetchMemes() {
    try {
      const response = await fetch(`${this.baseUrl}/get_memes`);
      if (!response.ok) {
        throw new Error('Failed to fetch memes');
      }
      const { data: { memes } } = await response.json();
      return memes;
    } catch (error) {
      console.log('Error fetching memes:', error);
      throw error;
    }
  }
}