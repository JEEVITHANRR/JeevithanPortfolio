import { useMemo } from 'react';
import data from '../data/portfolio.json';
import type { PortfolioData, Project } from '../types/portfolio';

const portfolio = data as PortfolioData;

export function usePortfolio() {
  const sortedProjects = useMemo<Project[]>(() =>
    [...portfolio.projects].sort((a, b) =>
      a.highlight === b.highlight ? 0 : a.highlight ? -1 : 1
    ), []);

  return { ...portfolio, projects: sortedProjects };
}
