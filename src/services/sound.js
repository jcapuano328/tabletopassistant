var Sound = require('react-native-sound');
Sound.setCategory('Playback');

module.exports = {
	play(file) {
		let sound = new Sound(file, Sound.MAIN_BUNDLE, (e) => {
			if (!e) {
				sound.play(() => {});
			}				
		});		
	}
};
