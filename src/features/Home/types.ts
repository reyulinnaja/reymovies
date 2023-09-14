export interface CarauselMovie {
  id: number;
  backdrop_path: string;
  title: string;
  overview: string;
}

export interface CarauselMoviesProps {
  data: CarauselMovie[];
}
