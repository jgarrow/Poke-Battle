<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <link rel="stylesheet" href="index.css">
    <link rel="stylesheet" href="loading-bar.css">
    <script type="text/javascript" src="index.js" ></script>
    <script type="text/javascript" src="loading-bar.js"></script>

    <title>Simple Pokemon Battle Simulator</title>
</head>
<body>
    <div>
        <form>
            Trainer name: <input type="text" name="name"><br>
            Trainer type: <select name="trainerType" id="myTrainerType">
                <option value="beauty">Beauty</option>
                <option value="biker">Biker</option>
                <option value="birdKeeper">Bird Keeper</option>
                <option value="blackbelt">Blackbelt</option>
                <option value="bugCatcher">Bug Catcher</option>
                <option value="burglar">Burglar</option>
                <option value="channeler">Channeler</option>
                <option value="coolTrainer">Cool Trainer</option>
                <option value="cueBall">Cue Ball</option>
                <option value="engineer">Engineer</option>
                <option value="fisherman">Fisherman</option>
                <option value="gambler">Gambler</option>
                <option value="gentleman">Gentleman</option>
                <option value="hiker">Hiker</option>
                <option value="jrTrainerM">Jr. Trainer ♂</option>
                <option value="jrTrainerF">Jr. Trainer ♀</option>
                <option value="juggler">Juggler</option>
                <option value="lass">Lass</option>
                <option value="pokemaniac">PokéManiac</option>
                <option value="psychic">Psychic</option>
                <option value="rocker">Rocker</option>
                <option value="sailor">Sailor</option>
                <option value="scientist">Scientist</option>
                <option value="superNerd">Super Nerd</option>
                <option value="swimmer">Swimmer</option>
                <option value="tamer">Tamer</option>
                <option value="youngster">Youngster</option>
            </select>
            Opponent type: <select name="trainerType" id="oppTrainerType">
                <option value="beauty">Beauty</option>
                <option value="biker">Biker</option>
                <option value="birdKeeper">Bird Keeper</option>
                <option value="blackbelt">Blackbelt</option>
                <option value="bugCatcher">Bug Catcher</option>
                <option value="burglar">Burglar</option>
                <option value="channeler">Channeler</option>
                <option value="coolTrainer">Cool Trainer</option>
                <option value="cueBall">Cue Ball</option>
                <option value="engineer">Engineer</option>
                <option value="fisherman">Fisherman</option>
                <option value="gambler">Gambler</option>
                <option value="gentleman">Gentleman</option>
                <option value="hiker">Hiker</option>
                <option value="jrTrainerM">Jr. Trainer ♂</option>
                <option value="jrTrainerF">Jr. Trainer ♀</option>
                <option value="juggler">Juggler</option>
                <option value="lass">Lass</option>
                <option value="pokemaniac">PokéManiac</option>
                <option value="psychic">Psychic</option>
                <option value="rocker">Rocker</option>
                <option value="sailor">Sailor</option>
                <option value="scientist">Scientist</option>
                <option value="superNerd">Super Nerd</option>
                <option value="swimmer">Swimmer</option>
                <option value="tamer">Tamer</option>
                <option value="teamRocketGrunt">Team Rocket Grunt</option>
                <option value="youngster">Youngster</option>
            </select>
        </form>
        <div id="beauty">
            Select Pokémon: <select name="Pokemon">
                <option value="bellsprout">Bellsprout</option>
                <option value="oddish">Oddish</option>
                <option value="exeggcute">Exeggcute</option>
                <option value="rattata">Rattata</option>
                <option value="pikachu">Pikachu</option>
                <option value="vulpix">Vulpix</option>
                <option value="clefairy">Clefairy</option>
                <option value="meowth">Meowth</option>
                <option value="pidgeotto">Pidgeotto</option>
                <option value="wigglytuff">Wigglytuff</option>
                <option value="bulbasaur">Bulbasaur</option>
                <option value="ivysaur">Ivysaur</option>
                <option value="goldeen">Goldeen</option>
                <option value="seaking">Seaking</option>
                <option value="poliwag">Poliwag</option>
                <option value="staryu">Staryu</option>
                <option value="horsea">Horsea</option>
                <option value="seadra">Seadra</option>
                <option value="shellder">Shellder</option>
                <option value="cloyster">Cloyster</option>
            </select>
        </div>

        <div id="biker">
            Select Pokémon: <select name="Pokemon">
                <option value="koffing">Koffing</option>
                <option value="weezing">Weezing</option>
                <option value="voltorb">Voltorb</option>
                <option value="grimer">Grimer</option>
                <option value="muk">Muk</option>
            </select>
        </div>

        <div id="birdKeeper">
            Select Pokemon: <select name="Pokemon">
                <option value="pidgey">Pidgey</option>
                <option value="pidgeotto">Pidgeotto</option>
                <option value="spearow">Spearow</option>
                <option value="fearow">Fearow</option>
                <option value="doduo">Doduo</option>
                <option value="dodrio">Dodrio</option>
                <option value="farfetch'd">Farfetch'd</option>
            </select>
        </div>

        <div id="blackbelt">
            Select Pokemon: <select name="Pokemon">
                <option value="machop">Machop</option>
                <option value="machoke">Machoke</option>
                <option value="mankey">Mankey</option>
                <option value="primeape">Primeape</option>
                <option value="hitmonlee">Hitmonlee</option>
                <option value="hitmonchan">Hitmonchan</option>
            </select>
        </div>

        <div id="bugCatcher">
            Select Pokemon: <select name="Pokemon">
                <option value="caterpie">Caterpie</option>
                <option value="metapod">Metapod</option>
                <option value="butterfree">Butterfree</option>
                <option value="weedle">Weedle</option>
                <option value="kakuna">Kakuna</option>
                <option value="beedrill">Beedrill</option>
                <option value="venonat">Venonat</option>
            </select>
        </div>

        <div id="burglar">
            Select Pokemon: <select name="Pokemon">
                <option value="charmander">Charmander</option>
                <option value="charmeleon">Charmeleon</option>
                <option value="vulpix">Vulpix</option>
                <option value="ninetales">Ninetales</option>
                <option value="growlithe">Growlithe</option>
                <option value="ponyta">Ponyta</option>
            </select>
        </div>

        <div id="channeler">
            Select Pokemon: <select name="Pokemon">
                <option value="gastly">Gastly</option>
                <option value="haunter">Haunter</option>
            </select>
        </div>

        <div id="coolTrainer">
            Select Pokemon: <select name="Pokemon">
                <option value="gloom">Gloom</option>
                <option value="ivysaur">Ivysaur</option>
                <option value="nidorino">Nidorino</option>
                <option value="nidoking">Nidoking</option>
                <option value="sandslash">Sandslash</option>
                <option value="dugtrio">Dugtrio</option>
                <option value="rhyhorn">Rhyhorn</option>
                <option value="persian">Persian</option>
                <option value="ninetales">Ninetales</option>
                <option value="wartortle">Wartortle</option>
                <option value="charmeleon">Charmeleon</option>
                <option value="charizard">Charizard</option>
                <option value="exeggutor">Exeggutor</option>
                <option value="cloyster">Cloyster</option>
                <option value="arcanine">Arcanine</option>
                <option value="parasect">Parasect</option>
                <option value="dewgong">Dewgong</option>
                <option value="chansey">Chansey</option>
                <option value="kingler">Kingler</option>
                <option value="tentacruel">Tentacruel</option>
                <option value="blastoise">Blastoise</option>
                <option value="bellsprout">Bellsprout</option>
                <option value="weepinbell">Weepinbell</option>
                <option value="victreebell">Victreebell</option>
            </select>
        </div>

        <div id="cueBall">
            Select Pokemon: <select name="Pokemon">
                <option value="machop">Machop</option>
                <option value="machoke">Machoke</option>
                <option value="mankey">Mankey</option>
                <option value="primeape">Primeape</option>
                <option value="tentacool">Tentacool</option>
                <option value="tentacruel">Tentacruel</option>
            </select>
        </div>

        <div id="engineer">
            Select Pokemon: <select name="Pokemon">
                <option value="magnemite">Magnemite</option>
                <option value="magneton">Magneton</option>
            </select>
        </div>

        <div id="fisherman">
            Select Pokemon: <select name="Pokemon">
                <option value="goldeen">Goldeen</option>
                <option value="seaking">Seaking</option>
                <option value="tentacool">Tentacool</option>
                <option value="shellder">Shellder</option>
                <option value="magikarp">Magikarp</option>
                <option value="staryu">Staryu</option>
                <option value="poliwag">Poliwag</option>
                <option value="horsea">Horsea</option>
            </select>
        </div>

        <div id="gambler">
            Select Pokemon: <select name="Pokemon">
                <option value="horsea">Horsea</option>
                <option value="poliwag">Poliwag</option>
                <option value="poliwhirl">Poliwhirl</option>
                <option value="bellsprout">Bellsprout</option>
                <option value="oddish">Oddish</option>
                <option value="growlithe">Growlithe</option>
                <option value="vulpix">Vulpix</option>
                <option value="voltorb">Voltorb</option>
                <option value="magnemite">Magnemite</option>
            </select>
        </div>

        <div id="gentleman">
            Select Pokemon: <select name="Pokemon">
                <option value="growlithe">Growlithe</option>
                <option value="pikachu">Pikachu</option>
                <option value="ponyta">Ponyta</option>
                <option value="magnemite">Magnemite</option>
                <option value="voltorb">Voltorb</option>
                <option value="nidoran♂">Nidoran♂</option>
                <option value="nidoran♀">Nidoran♀</option>
            </select>
        </div>

        <div id="hiker">
            Select Pokemon: <select name="Pokemon">
                <option value="geodude">Geodude</option>
                <option value="graveler">Graveler</option>
                <option value="onix">Onix</option>
                <option value="machop">Machop</option>
            </select>
        </div>

        <div id="picnicker♂">
            Select Pokemon: <select name="Pokemon">
                <option value="diglett">Diglett</option>
                <option value="sandshrew">Sandshrew</option>
                <option value="mankey">Mankey</option>
                <option value="rattata">Rattata</option>
                <option value="raticate">Raticate</option>
                <option value="ekans">Ekans</option>
                <option value="squirtle">Squirtle</option>
                <option value="spearow">Spearow</option>
                <option value="growlithe">Growlithe</option>
                <option value="charmander">Charmander</option>
                <option value="weepinbell">Weepinbell</option>
                <option value="nidoran♂">Nidoran♂</option>
                <option value="nidorino">Nidorino</option>
            </select>
        </div>

        <div id="picnicker♀">
            Select Pokemon: <select name="Pokemon">
                <option value="goldeen">Goldeen</option>
                <option value="seaking">Seaking</option>
                <option value="rattata">Rattata</option>
                <option value="pikachu">Pikachu</option>
                <option value="raichu">Raichu</option>
                <option value="pidgey">Pidgey</option>
                <option value="pidgeotto">Pidgeotto</option>
                <option value="pddish">Oddish</option>
                <option value="gloom">Gloom</option>
                <option value="bellsprout">Bellsprout</option>
                <option value="tangela">Tangela</option>
                <option value="meowth">Meowth</option>
                <option value="clefairy">Clefairy</option>
                <option value="bulbasaur">Bulbasaur</option>
                <option value="ivysaur">Ivysaur</option>
                <option value="poliwag">Poliwag</option>
                <option value="horsea">Horsea</option>
                <option value="tentacool">Tentacool</option>
                <option value="seel">Seel</option>
                <option value="cubone">Cubone</option>
            </select>
        </div>

        <div id="juggler">
            Select Pokemon: <select name="Pokemon">
                <option value="kadabra">Kadabra</option>
                <option value="mrMime">Mr. Mime</option>
                <option value="drowzee">Drowzee</option>
                <option value="hypno">Hypno</option>
            </select>
        </div>

        <div id="lass">
            Select Pokemon: <select name="Pokemon">
                <option value="nidoran♂">Nidoran♂</option>
                <option value="nidoran♀">Nidoran♀</option>
                <option value="pidgey">Pidgey</option>
                <option value="rattata">Rattata</option>
                <option value="jigglypuff">Jigglypuff</option>
                <option value="clefairy">Clefairy</option>
                <option value="oddish">Oddish</option>
                <option value="gloom">Gloom</option>
                <option value="bellsprout">Bellsprout</option>
                <option value="weepinbell">Weepinbell</option>
                <option value="pikachu">Pikachu</option>
                <option value="meowth">Meowth</option>
                <option value="nidorina">Nidorina</option>
                <option value="paras">Paras</option>
                <option value="parasect">Parasect</option>
            </select>
        </div>

        <div id="pokemaniac">
            Select Pokemon: <select name="Pokemon">
                <option value="cubone">Cubone</option>
                <option value="slowpoke">Slowpoke</option>
                <option value="charmander">Charmander</option>
                <option value="charmeleon">Charmeleon</option>
                <option value="lickitung">Lickitung</option>
                <option value="lapras">Lapras</option>
            </select>
        </div>

        <div id="psychic">
            Select Pokemon: <select name="Pokemon">
                <option value="slowpoke">Slowpoke</option>
                <option value="slowbro">Slowbro</option>
                <option value="mrMime">Mr. Mime</option>
                <option value="kadabra">Kadabra</option>
            </select>
        </div>

        <div id="rocker">
            Select Pokemon: <select name="Pokemon">
                <option value="magnemite">Magnemite</option>
                <option value="voltorb">Voltorb</option>
                <option value="electrode">Electrode</option>
            </select>
        </div>

        <div id="sailor">
            Select Pokemon: <select name="Pokemon">
                <option value="machop">Machop</option>
                <option value="tentacool">Tentacool</option>
                <option value="shellder">Shellder</option>
                <option value="horsea">Horsea</option>
                <option value="staryu">Staryu</option>
                <option value="pikachu">Pikachu</option>
                <option value="magnemite">Magnemite</option>
            </select>
        </div>

        <div id="scientists">
            Select Pokemon: <select name="Pokemon">
                <option value="magnemite">Magnemite</option>
                <option value="magneton">Magneton</option>
                <option value="voltorb">Voltorb</option>
                <option value="electrode">Electrode</option>
                <option value="grimer">Grimer</option>
                <option value="muk">Muk</option>
                <option value="koffing">Koffing</option>
                <option value="weezing">Weezing</option>
            </select>
        </div>

        <div id="superNerd">
            Select Pokemon: <select name="Pokemon">
                <option value="magnemite">Magnemite</option>
                <option value="voltorb">Voltorb</option>
                <option value="grimer">Grimer</option>
                <option value="muk">Muk</option>
                <option value="koffing">Koffing</option>
                <option value="vulpix">Vulpix</option>
                <option value="ninetales">Ninetales</option>
                <option value="growlithe">Growlithe</option>
                <option value="charmander">Charmander</option>
            </select>
        </div>

        <div id="swimmer">
            Select Pokemon: <select name="Pokemon">
                <option value="horsea">Horsea</option>
                <option value="seadra">Seadra</option>
                <option value="shellder">Shellder</option>
                <option value="cloyster">Cloyster</option>
                <option value="staryu">Staryu</option>
                <option value="starmie">Starmie</option>
                <option value="goldeen">Goldeen</option>
                <option value="seaking">Seaking</option>
                <option value="tentacool">Tentacool</option>
                <option value="tentacruel">Tentacruel</option>
                <option value="poliwag">Poliwag</option>
                <option value="poliwhirl">Poliwhirl</option>
                <option value="wartortle">Wartortle</option>
            </select>
        </div>

        <div id="tamer">
            Select Pokemon: <select name="Pokemon">
                <option value="tauros">Tauros</option>
                <option value="arbok">Arbok</option>
                <option value="rhyhorn">Rhyhorn</option>
                <option value="sandslash">Sandslash</option>
                <option value="persian">Persian</option>
                <option value="golduck">Golduck</option>
            </select>
        </div>

        <div id="teamRocketGrunt">
            Select Pokemon: <select name="Pokemon">
                <option value="sandshrew">Sandshrew</option>
                <option value="sandslash">Sandslash</option>
                <option value="rattata">Rattata</option>
                <option value="raticate">Raticate</option>
                <option value="meowth">Meowth</option>
                <option value="machop">Machop</option>
                <option value="machoke">Machoke</option>
                <option value="drowzee">Drowzee</option>
                <option value="hypno">Hypno</option>
                <option value="koffing">Koffing</option>
                <option value="weezing">Weezing</option>
                <option value="grimer">Grimer</option>
                <option value="zubat">Zubat</option>
                <option value="golbat">Golbat</option>
                <option value="ekans">Ekans</option>
                <option value="arbok">Arbok</option>
                <option value="cubone">Cubone</option>
            </select>
        </div>

        <div id="youngster">
            Select Pokemon: <select name="Pokemon">
                <option value="rattata">Rattata</option>
                <option value="raticate">Raticate</option>
                <option value="ekans">Ekans</option>
                <option value="spearow">Spearow</option>
                <option value="zubat">Zubat</option>
                <option value="slowpoke">Slowpoke</option>
                <option value="sandshrew">Sandshrew</option>
                <option value="nidoran♂">Nidoran♂</option>
                <option value="nidorino">Nidorino</option>
            </select>
        </div>
    </div>
</body>
</html>