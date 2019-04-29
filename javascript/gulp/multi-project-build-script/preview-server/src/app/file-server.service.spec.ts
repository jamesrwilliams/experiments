import { TestBed } from '@angular/core/testing';

import { FileServerService } from './file-server.service';

describe('FileServerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FileServerService = TestBed.get(FileServerService);
    expect(service).toBeTruthy();
  });
});
