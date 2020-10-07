import 'es6-promise';
import 'isomorphic-fetch';
import buildUrl from 'build-url';

const { REACT_APP_SERVER_URL } = process.env as { [key: string]: string };

type ContactStrategies = 'ae' | 'au' | 'acm';

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
    // ------- Vaiidation
    const validationErrors: string[] = this.validateInputs();
    if (validationErrors.length > 0) {
      return `Error: ${validationErrors.join(". ")}`;
    }

    // ------- Email sending
    const shouldBeEmailed: boolean = this.contactStrategy === 'ae';
    let emailSent: boolean;
    if (shouldBeEmailed) {
      // emailSent = await this.sendEmail();
    }

    // ------- Contact adding
    const addedContact = await this.addContact();
    const addedContactExists = Object.keys(addedContact).length > 0;
    return addedContact.toString();

/*
    // -------  Flash message return
    if (emailSent) {
        return 'User added and emailed';
      }
    } else {
      return 'User added, but failed to send email'
    if (this.contactStrategy === 'acm') {
      // this.addContactTimelineEvent(this.customContactChannel);

      return `User added with timeline event indicating contacted via ${this.customContactChannel}`
    }

    return 'User added with no contact event';
*/
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

  private async addContact() {
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
  
      const newContact = response.json();
      console.log('newContact', newContact);
      return newContact;
    } catch (error) {
      throw new Error(error);
    }
  }

  private async sendEmail() {
    throw new Error('Method not implemented.');
  }
}