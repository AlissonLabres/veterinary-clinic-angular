import { fixture } from '../config/fixture';
import AxeBuilder from '@axe-core/playwright';
import { createHtmlReport } from 'axe-html-reporter';

const fs = require('fs');

let accessibilityScanResults: any;

export const accessibilityScan = async () => {
  accessibilityScanResults = undefined;
  accessibilityScanResults = await new AxeBuilder({
    page: fixture.page,
  }).analyze();
};

export const violations = () => {
  return accessibilityScanResults.violations.length > 0;
};

export const createReport = (pageName: string) => {
  pageName = pageName
    .toLowerCase()
    .replace(/\s/g, '-');

  const fileName = `accessibility-report-${pageName}.html`;
  const pathName = 'tests/reports';

  const reportHTML = createHtmlReport({
    results: accessibilityScanResults,
    options: {
      projectKey: pageName,
      outputDir: pathName,
      reportFileName: fileName,
    },
  });

  if (!fs.existsSync(`${pathName}/${fileName}`)) {
    fs.mkdirSync(pathName, { recursive: true });
  }

  fs.writeFileSync(`${pathName}/${fileName}`, reportHTML);
};
