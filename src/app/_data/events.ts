export interface EventType {
  id: string;
  title: string;
  start: Date;
  end: Date;
  isDraggable: boolean;
}

export const events: EventType[] = [
  {
    id: "1",
    title: "Board meeting",
    start: new Date(2024, 2, 15, 11, 0, 0),
    end: new Date(2024, 2, 15, 12, 0, 0),
    isDraggable: true,
  },
  {
    id: "2",
    title: "MS training",
    start: new Date(2024, 2, 15, 14, 0, 0),
    end: new Date(2024, 2, 15, 16, 30, 0),
    isDraggable: true,
  },
  {
    id: "3",
    title: "Team lead meeting",
    start: new Date(2024, 2, 16, 10, 30, 0),
    end: new Date(2024, 2, 16, 11, 30, 0),
    isDraggable: true,
  },
  {
    id: "4",
    title: "Birthday Party",
    start: new Date(2024, 2, 16, 15, 0, 0),
    end: new Date(2024, 2, 16, 16, 30, 0),
    isDraggable: true,
  },
  {
    id: "5",
    title: "Training",
    start: new Date(2024, 2, 16, 17, 0, 0),
    end: new Date(2024, 2, 16, 19, 30, 0),
    isDraggable: true,
  },
];
