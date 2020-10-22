import 'es6-promise';
import 'isomorphic-fetch';
import buildUrl from 'build-url';

const { REACT_APP_SERVER_URL } = process.env as { [key: string]: string };

export default class Submitter {
  constructor(
    private firstName: string, private lastName: string, private companyName: string,
    private employeeRoleCode: string, private email: string, private completeIntroSentence: string, private contactStrategy: string, private customContactChannel: string,
  ) {}

  /*
    adds contact. controls whether to send email
    returns a flash message based on path taken
  */
  public async addAndSometimesEmail(): Promise<string> {
    this.addToHubspot(); // nothing to await on

    let errorOrMessage =  [];

    const shouldBeEmailed: boolean = this.contactStrategy === 'ae';
    if (shouldBeEmailed) {

      try {
        const message: string = await this.sendEmail();
        errorOrMessage.push(message);
        // todo add contact addition to hubspot
        // push its value too, then join and return
        return errorOrMessage.join(' ');
      } catch (error) {
        errorOrMessage.push(error);
      }

    } else if (this.contactStrategy === 'acm') {
      // this.addContactTimelineEvent(this.customContactChannel);

      return `User added with timeline event indicating contacted via ${this.customContactChannel}`;
    }
    

    return 'User added to Hubspot with no contact event';
  }

  // ---------------------- Internal Methods

  private validateInputs(): string[] {
    const errorMessages = [];

    if (this.contactStrategy !== 'ae' && this.contactStrategy !== 'au' && this.contactStrategy !== 'acm') {
      errorMessages.push('Invalid contact strategy.');
    }

    const emailPattern = /^.+@.+\..+/;
    const emailMatchesPattern = emailPattern.test(this.email);
    if (emailMatchesPattern === false) {
      errorMessages.push('Invalid email detected.');
    }

    return errorMessages;
  }

  // todo fix this one
  // todo figure out how to get the new contact id from hubspot
  private async addContactTimelineEvent(channelAndContactId: string): Promise<boolean> {
    const timelineUrl = buildUrl(REACT_APP_SERVER_URL, {
      path: '/contact/custom-channel',
      queryParams: {
        // todo
      }
    });

    try {
      const response = await fetch(timelineUrl, {
        method: 'get',
        headers: new Headers({
          'content-type': 'x-www-form-urlencoded',
        }),
      });

      if (response.ok) { return true; }
      return false;
    } catch (error) {
      throw new Error(error);
    }
  }

  private async addToHubspot() {
    const createUrl = buildUrl(REACT_APP_SERVER_URL, {
      path: '/contact/new',
    });

    try {
      const response = await fetch(createUrl, {
        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({ firstName: this.firstName, lastName: this.lastName, companyName: this.companyName, employeeRoleCode: this.employeeRoleCode, email: this.email, completeIntroSentence: this.completeIntroSentence, customContactChannel: this.customContactChannel }),
      })
  
      const newContact = await response.json();
      console.log('newContact', newContact);
      return newContact;
    } catch (error) {
      throw new Error(error);
    }
  }

  private async sendEmail(): Promise<string> {
    const emailEndpoint = buildUrl(REACT_APP_SERVER_URL, {
      path: '/email/send'
    });

    const body = JSON.stringify({
      firstName: this.firstName,
      companyName: this.companyName,
      email: this.email,
      employeeRoleCode: this.employeeRoleCode,
      completeIntroSentence: this.completeIntroSentence,
    });

    try {
      const response = await fetch(emailEndpoint, {
        method: 'post',
        headers: new Headers({
          'content-type': 'application/json',

        }),
        body,
      });

      const message: string = (await response.json()).message;
      return message;
    } catch (error) {
      throw new Error(error);
    }
  }
}