export interface CardProps {
  id: number;
  poster_path: string;
  title: string;
  original_name: string;
  release_date: string;
  first_air_date: string;
  vote_average: number;
  favorite?: boolean;
}

export interface CardListProps {
  data: CardProps[];
}
