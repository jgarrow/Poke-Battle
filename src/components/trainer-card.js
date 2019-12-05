import React from "react"

export default ({ trainers }) => (
    <div>
        <form>
            <label htmlFor="name">Name:</label><input type="text" name="name"/>
            <label htmlFor="trainer-type">Trainer type:</label>
            <select name="trainer-type">
{trainers.map((trainer, index) => <option key={index} value={trainer.name}>{trainer.name}</option>)}
                {/* <option value="beauty">Beauty</option>
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
                <option value="youngster">Youngster</option> */}
            </select>
            <label htmlFor="party">Party Pokémon:</label>
            <select>
                {/* <option value={props.pokemonName}>{props.pokemonName}</option> */}
            </select>
        </form>
    </div>
)