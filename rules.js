let sword = 0;
let quest = 0;

class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title);
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, "Home"); // TODO: replace this text by the initial location of the story
    }
}

class Location extends Scene {
    create(key) {
        //if the user entered the location with the key, set a variable to a number greater than zero which indicates the user has the key in their inventory
        if(key == "The Sword"){
            sword++;
        }
        //if the user has pulled the sword out of the stone, then the stone should always give the user empty stone location
        if(key == "The Stone" && sword > 0){
            key = "The Stone Empty";
        }
        let locationData = this.engine.storyData.Locations[key]; // TODO: use `key` to get the data object for the current story location DONE
        this.engine.show(locationData.Body); // TODO: replace this text by the Body of the location data DONE

        if(typeof(locationData.Choices[0] != "undefined")) { // TODO: check if the location has any Choices
            for(let choice of locationData.Choices) { // TODO: loop over the location's Choices
                this.engine.addChoice(choice.Text, choice); // TODO: use the Text of the choice
                // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works

                if(key == "Dragon Lair" && sword == 0) break;
            }
        } else {
            this.engine.addChoice("The end.");
        }

        if(key == "Win") this.engine.gotoScene(End);
    }

    handleChoice(choice) {
        if(choice) {
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target);
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');