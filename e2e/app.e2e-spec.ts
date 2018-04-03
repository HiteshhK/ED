import { JSPlumbToolkitPage } from './app.po';

describe('jsplumb-toolkit App', () => {
  let page: JSPlumbToolkitPage;

  beforeEach(() => {
    page = new JSPlumbToolkitPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
