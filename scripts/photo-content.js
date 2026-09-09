module.exports = species => {
  const photo = (name, alt, caption, width = 1200, height = 1600) => ({file: '/images/photos/' + name, alt, caption, width, height});
  const halibut = species.find(s => s.slug === 'halibut');
  halibut.hero = true;
  halibut.ogImage = '/images/og/halibut-catch.jpg';
  halibut.photo = photo('pacific-halibut-port-renfrew-boat', 'Angler aboard a boat holding a Pacific halibut with its pale underside facing the camera', 'Pacific halibut from a trip off Port Renfrew, British Columbia. Photo from Jordan Hoth’s fishing collection.');
  halibut.gallery = [photo('pacific-halibut-port-renfrew-dock', 'Angler holding a Pacific halibut on a dock with forested hills behind him', 'Back at the dock in Port Renfrew. This view shows the pale underside, rather than the eyes used in identification.')];
  const snapper = species.find(s => s.slug === 'red-snapper');
  snapper.hero = true;
  snapper.ogImage = '/images/og/red-snapper-catch.jpg';
  snapper.photo = photo('american-red-snapper-offshore', 'Angler holding an American red snapper broadside above the deck of a boat on calm blue water', 'American red snapper, with the head, flank, and tail visible. Photo from Jordan Hoth’s fishing collection.');
  const gag = species.find(s => s.slug === 'gag-grouper');
  gag.photo = photo('gag-grouper-boat', 'Angler aboard a boat holding a gag grouper with irregular dark markings on its pale body', 'The irregular dark markings on this gag grouper help distinguish it from red grouper.');
  gag.ogImage = '/images/og/gag-grouper-catch.jpg';
  const red = species.find(s => s.slug === 'red-grouper');
  red.photo = photo('red-grouper-dock', 'Angler on a dock holding a red grouper with a reddish body and irregular pale blotches', 'Red grouper with pale blotches along its reddish flank. Photo from Jordan Hoth’s fishing collection.', 1200, 1431);
  red.ogImage = '/images/og/red-grouper-catch.jpg';
  red.gallery = [photo('mixed-grouper-snapper-dock', 'Several grouper and striped snapper arranged together on a wooden dock', 'A mixed catch of snapper and grouper. Identify each fish separately before applying harvest rules.', 1200, 900)];
};
