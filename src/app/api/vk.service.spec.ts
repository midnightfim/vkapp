import { TestBed } from '@angular/core/testing';

import { VkService } from './vk.service';

describe('VkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VkService = TestBed.get(VkService);
    expect(service).toBeTruthy();
  });
});
