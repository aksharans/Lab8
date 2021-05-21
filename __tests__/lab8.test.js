describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);
  });

  // test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });

  // test 2 is given
  // it('Test2: Make sure <journal-entry> elements are populated', async () => {
  //   let allArePopulated = true;
  //   let data, plainValue;
  //   const entries = await page.$$('journal-entry');
  //   for (let i = 0; i < entries.length; i++) {
  //     data = await entries[i].getProperty('entry');
  //     plainValue = await data.jsonValue();
  //     if (plainValue.title.length == 0) { allArePopulated = false; }
  //     if (plainValue.date.length == 0) { allArePopulated = false; }
  //     if (plainValue.content.length == 0) { allArePopulated = false; }
  //   }
  //   expect(allArePopulated).toBe(true);
  // }, 30000);

  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    const entries = await page.$$('journal-entry');
    const firstEntry = entries[0];
    
    await firstEntry.click();
    await page.waitForNavigation();

    const urlOfPage = new URL(page.url());
    expect(urlOfPage.hash).toBe('#entry1');
  }, 10000);

  it('Test4: On first Entry page - checking page header title', async () => {
    const pageTitle = await page.title();
    expect(pageTitle).toBe('Entry 1');
  });

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {
    const journalContents = { 
      title: 'You like jazz?',
      date: '4/25/2021',
      content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
      image: {
        src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
        alt: 'bee with sunglasses'
      }
    };

    const entryTitle = await page.$eval('pierce/.entry-title', (element) => {
      return element.innerHTML
    });
    const entryDate = await page.$eval('pierce/.entry-date', (element) => {
      return element.innerHTML
    });
    const entryContent = await page.$eval('pierce/.entry-content', (element) => {
      return element.innerHTML
    });
    const entryImageSrc = await page.$eval('pierce/.entry-image', (element) => {
      return element.getAttribute('src');
    });
    const entryImageAlt = await page.$eval('pierce/.entry-image', (element) => {
      return element.getAttribute('alt');
    });
    
    expect(entryTitle).toBe(journalContents.title);
    expect(entryDate).toBe(journalContents.date);
    expect(entryContent).toBe(journalContents.content);
    expect(entryImageSrc).toBe(journalContents.image.src);
    expect(entryImageAlt).toBe(journalContents.image.alt);
  }, 10000);

  it('Test6: On first Entry page - checking <body> element classes', async () => {
    const body = await page.$('body');
    const bodyClass = await body.getProperty('className');
    const bodyClassArray = await bodyClass.jsonValue();

    expect(bodyClassArray).toBe('single-entry');
  });

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    const settingIcon = await page.$('header > img');

    await settingIcon.click();
    await page.waitForNavigation();

    const urlOfPage = new URL(page.url());
    expect(urlOfPage.hash).toBe('#settings');
  }, 10000);

  it('Test8: On Settings page - checking page header title', async () => {
    const pageTitle = await page.title();
    expect(pageTitle).toBe('Settings');
  });

  it('Test9: On Settings page - checking <body> element classes', async () => {
    const body = await page.$('body');
    const bodyClass = await body.getProperty('className');
    const bodyClassArray = await bodyClass.jsonValue();

    expect(bodyClassArray).toBe('settings');
  });

  it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
    await page.goBack();

    const urlOfPage = new URL(page.url());
    expect(urlOfPage.hash).toBe('#entry1');
  }, 10000);

  it('Test11: Clicking the back button once should bring the user back to the home page', async () => {
    await page.goBack();

    const urlOfPage = new URL(page.url());
    expect(urlOfPage.pathname).toBe('/');
  }, 10000);


  it('Test12: When the user if on the homepage, the header title should be “Journal Entries”', async () => {
    const pageTitle = await page.title();
    expect(pageTitle).toBe('Journal Entries');
  });


  it('Test13: On the home page the <body> element should not have any class attribute ', async () => {
    const body = await page.$('body');
    const bodyClass = await body.getProperty('className');
    const bodyClassArray = await bodyClass.jsonValue();
    expect(bodyClassArray).toBe("");
  });


  it('Test14: Verify the url is correct when clicking on the second entry', async () => {
    const entries = await page.$$('journal-entry');
    const secondEntry = entries[1];
    
    await secondEntry.click();
    await page.waitForNavigation();

    const urlOfPage = new URL(page.url());
    expect(urlOfPage.hash).toBe('#entry2');
  }, 10000);


  it('Test15: Verify the title is current when clicking on the second entry', async () => {
    const pageTitle = await page.title();
    expect(pageTitle).toBe('Entry 2');
  });


  it('Test16: Verify the entry page contents is correct when clicking on the second entry', async () => {
    const secondEntryContents = {
      date: "4/26/2021",
      title: "Run, Forrest! Run!",
      content: "Mama always said life was like a box of chocolates. You never know what you're gonna get.",
      image: {
          src: "https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg",
          alt: "forrest running"
      },
      audio: null
    };

    const entryTitle = await page.$eval('pierce/.entry-title', (element) => {
      return element.innerHTML
    });
    const entryDate = await page.$eval('pierce/.entry-date', (element) => {
      return element.innerHTML
    });
    const entryContent = await page.$eval('pierce/.entry-content', (element) => {
      return element.innerHTML
    });
    const entryImageSrc = await page.$eval('pierce/.entry-image', (element) => {
      return element.getAttribute('src');
    });
    const entryImageAlt = await page.$eval('pierce/.entry-image', (element) => {
      return element.getAttribute('alt');
    });
    
    expect(entryTitle).toBe(secondEntryContents.title);
    expect(entryDate).toBe(secondEntryContents.date);
    expect(entryContent).toBe(secondEntryContents.content);
    expect(entryImageSrc).toBe(secondEntryContents.image.src);
    expect(entryImageAlt).toBe(secondEntryContents.image.alt);
  }, 10000);

  it('Test17: "Settings" navigation bar has different color', async () => {
    await page.goBack();

    const settingIcon = await page.$('header > img');

    await settingIcon.click();
    await page.waitForNavigation();

    const navbarColor = await page.$eval("header", (element) => {
      return window.getComputedStyle(element).getPropertyValue('background-color');
    });
    expect(navbarColor).toBe('rgb(197, 197, 197)');
  
  }, 20000);

  it('Test18: Navbar color changes back when reaching main page', async () => {
    await page.goBack();

    const navbarColor = await page.$eval("header", (element) => {
      return window.getComputedStyle(element).getPropertyValue('background-color');
    });
    expect(navbarColor).toBe('rgb(217, 210, 129)');
  }, 10000);

  it('Test19: No extraneous audio placed on single entry pages with no audio content', async () => {
    const entries = await page.$$('journal-entry');
    const firstEntry = entries[0];
    
    await firstEntry.click();
    await page.waitForNavigation();

    const entryAudio = await page.$('.entry-audio');
    expect(entryAudio).toBe(null);
  }, 10000);

  it('Test20: Audio placed on single entry pages with audio content', async () => {
    const journalContents = {
      date: "4/28/2021",
      title: "You're a wizard, Harry",
      content: "Hmm, difficult. VERY difficult. Plenty of courage, I see. Not a bad mind, either. There's talent, oh yes. And a thirst to prove yourself. But where to put you? Not Slytherin. Not Slytherin. Not Slytherin, eh? Are you sure? You could be great, you know. It's all here in your head. And Slytherin will help you on the way to greatness, there's no doubt about that. No? Please, please. Anything but Slytherin, anything but Slytherin. Well if you're sure, better be... GRYFFINDOR!",
      image: {
          src: "https://w7w5t4b3.rocketcdn.me/wp-content/uploads/2019/01/harry-potter-sorting-hat-wrong.jpg",
          alt: "harry looking up at the sorting hat"
      },
      audio: "https://drive.google.com/uc?export=download&id=1Orwnly-OMhNt83tb-SAWt6Y3S6AYQgkk"
    };

    await page.goBack();

    const entries = await page.$$('journal-entry');
    const thirdEntry = entries[3];
    
    await thirdEntry.click();
    await page.waitForNavigation();

    const entryAudioSrc = await page.$eval('pierce/.entry-audio', (element) => {
      return element.getAttribute('src');
    });
    
    expect(entryAudioSrc).toBe(journalContents.audio);
  }, 20000);
  
});
