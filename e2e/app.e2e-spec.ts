import { ShedulePage } from './app.po';

describe('shedule App', () => {
  let page: ShedulePage;

  beforeEach(() => {
    page = new ShedulePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
