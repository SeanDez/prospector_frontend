import buildUrl from 'build-url';
import 'es6-promise';
import 'isomorphic-fetch';

import ProspectCategories from '../shared/EProspectCategories';
import IHubspotProperty from './IHubspotProperty';
import { prospectCategory, introMessage } from './customPropData';

const { REACT_APP_SERVER_URL } = process.env as { [key: string]: string };

export default class CustomPropertyManager {
  customProperties: IHubspotProperty[] = [prospectCategory, introMessage]


  public async verifyOrAddCustomProperties(): Promise<object[] | null> {
    const allPropertyNames = await this.fetchGetAll();
    console.log('allPropertyNames', allPropertyNames);
    const missingProperties: IHubspotProperty[] = this.findMissing(allPropertyNames);
    console.log('missingProperties', missingProperties);

    try {
      if (missingProperties.length > 0) {
        console.log('customPropManager line 23 if statement begin');
        const newProperties: object[] = await this.fetchCreateNew(missingProperties);
        return newProperties;
      }
    } catch (error) {
      throw new Error(error);
    }

    return null;
  }

  // ----------------- Internal Methods

  private async fetchGetAll(): Promise<string[]> {
    const getAllRequestor = buildUrl(REACT_APP_SERVER_URL, {
      path: '/properties'
    });

    try {
      const response = await fetch(getAllRequestor, {
        headers: {
          'content-type': 'application/json'
        }
      });

      const allProperties: { name: string, label: string }[] = await response.json();
      const allPropertyKeys: string[] = allProperties.map((property: { name: string, label: string }) => property.name);
      return allPropertyKeys;
    } catch (error) {
      throw new Error(error);
    }
  }

  private findMissing(allPropertyNames: string[]): IHubspotProperty[] {
    const missingKeys: IHubspotProperty[] = this.customProperties.filter((customProperty: IHubspotProperty) => {
      const customKeyPresent: boolean = allPropertyNames.includes(customProperty.name);
      if (customKeyPresent) {
        return false;
      }

      return true;
    })
    return missingKeys;
  }

  private async fetchCreateNew(missingProperties: IHubspotProperty[]): Promise<object[]> {
    const createNewRequestor = encodeURI(buildUrl(REACT_APP_SERVER_URL, {
      path: '/properties',
    }));

    try {
      const newProperties: Promise<object>[] = missingProperties.map(async (missingProperty: IHubspotProperty) => {
        console.log('missingProperty', missingProperty);
        const body = JSON.stringify(missingProperty);
        console.log(`body`, body);
  
        try {
          const response = await fetch(createNewRequestor, {
            method: 'post',
            headers: {
              'content-type': 'application/json'
            },
            body,
          });
  
          const newProperty = await response.json();
          return newProperty;
        } catch (error) {
          throw new Error(error);
        }
      });

      const resolved: object[] = await Promise.all(newProperties);
      return resolved;
    } catch (error) {
      throw new Error(error);
    }
  }
}