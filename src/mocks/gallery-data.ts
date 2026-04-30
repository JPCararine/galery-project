export const albums = [
  { id: "123", title: "Album 1" },
  { id: "345", title: "Album 2" },
  { id: "678", title: "Album 3" },
  {id: "555", title: "Album 4"}
];

export const photos = [
  {
    id: "123",
    title: "Olá mundo!",
    imageId: "portrait-tower.png",
    albums: [
        {id: "123", title: "Album 1"},
        {id: "345", title: "Album 2"},
        {id: "678", title: "Album 3"}
    ]
  }
];