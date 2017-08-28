import { FiremapPage } from './app.po';

describe('firemap App', () => {
  let page: FiremapPage;

  beforeEach(() => {
    page = new FiremapPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
