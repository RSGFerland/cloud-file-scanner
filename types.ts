
export interface HeavyFile {
  id: string;
  fileName: string;
  fullPath: string;
  currentSizeMB: number;
  versionCount: number;
  estSpaceSavingsMB: number;
  lastModified: string;
  selected?: boolean;
}

export enum AppSection {
  DASHBOARD = 'DASHBOARD',
  SCANNER = 'SCANNER',
  ARCHIVES = 'ARCHIVES',
  AZURE_OPS = 'AZURE_OPS',
  SETTINGS = 'SETTINGS'
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export interface PetMood {
  state: 'neutral' | 'happy' | 'excited' | 'scanning';
  message: string;
}
