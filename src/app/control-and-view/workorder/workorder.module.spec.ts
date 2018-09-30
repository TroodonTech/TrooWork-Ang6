import { WorkorderModule } from './workorder.module';

describe('WorkorderModule', () => {
  let workorderModule: WorkorderModule;

  beforeEach(() => {
    workorderModule = new WorkorderModule();
  });

  it('should create an instance', () => {
    expect(workorderModule).toBeTruthy();
  });
});
