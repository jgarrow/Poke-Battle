import { graphql } from "gatsby";

export const trainerImagesQueryString = graphql`
    query {
        aceTrainerFPic: file(relativePath: { eq: "cool_trainer_f.png" }) {
            childImageSharp {
                fixed(width: 125, height: 125) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        aceTrainerMPic: file(relativePath: { eq: "cool_trainer_m.png" }) {
            childImageSharp {
                fixed(width: 125, height: 125) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        beautyPic: file(relativePath: { eq: "beauty.png" }) {
            childImageSharp {
                fixed(width: 125, height: 125) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        birdKeeperPic: file(relativePath: { eq: "bird_keeper.png" }) {
            childImageSharp {
                fixed(width: 125, height: 125) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        blackbeltPic: file(relativePath: { eq: "blackbelt.png" }) {
            childImageSharp {
                fixed(width: 125, height: 125) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        bugCatcherPic: file(relativePath: { eq: "bug_catcher.png" }) {
            childImageSharp {
                fixed(width: 125, height: 125) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        burglarPic: file(relativePath: { eq: "burglar.png" }) {
            childImageSharp {
                fixed(width: 125, height: 125) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        camperPic: file(relativePath: { eq: "camper.png" }) {
            childImageSharp {
                fixed(width: 125, height: 125) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        channelerPic: file(relativePath: { eq: "channeler.png" }) {
            childImageSharp {
                fixed(width: 125, height: 125) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        engineerPic: file(relativePath: { eq: "engineer.png" }) {
            childImageSharp {
                fixed(width: 125, height: 125) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        fishermanPic: file(relativePath: { eq: "fisherman.png" }) {
            childImageSharp {
                fixed(width: 125, height: 125) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        gamerPic: file(relativePath: { eq: "gamer.png" }) {
            childImageSharp {
                fixed(width: 125, height: 125) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        gentlemanPic: file(relativePath: { eq: "gentleman.png" }) {
            childImageSharp {
                fixed(width: 125, height: 125) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        hikerPic: file(relativePath: { eq: "hiker.png" }) {
            childImageSharp {
                fixed(width: 125, height: 125) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        jugglerPic: file(relativePath: { eq: "juggler.png" }) {
            childImageSharp {
                fixed(width: 125, height: 125) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        lassPic: file(relativePath: { eq: "lass.png" }) {
            childImageSharp {
                fixed(width: 125, height: 125) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        picnickerPic: file(relativePath: { eq: "picnicker.png" }) {
            childImageSharp {
                fixed(width: 125, height: 125) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        pokeManiacPic: file(relativePath: { eq: "poke_maniac.png" }) {
            childImageSharp {
                fixed(width: 125, height: 125) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        psychicPic: file(relativePath: { eq: "psychic.png" }) {
            childImageSharp {
                fixed(width: 125, height: 125) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        punkGuyPic: file(relativePath: { eq: "punk_guy.png" }) {
            childImageSharp {
                fixed(width: 125, height: 125) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        rockerPic: file(relativePath: { eq: "rocker.png" }) {
            childImageSharp {
                fixed(width: 125, height: 125) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        roughneckPic: file(relativePath: { eq: "roughneck.png" }) {
            childImageSharp {
                fixed(width: 125, height: 125) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        sailorPic: file(relativePath: { eq: "sailor.png" }) {
            childImageSharp {
                fixed(width: 125, height: 125) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        scientistPic: file(relativePath: { eq: "scientist.png" }) {
            childImageSharp {
                fixed(width: 125, height: 125) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        superNerdPic: file(relativePath: { eq: "super_nerd.png" }) {
            childImageSharp {
                fixed(width: 125, height: 125) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        swimmerPic: file(relativePath: { eq: "swimmer.png" }) {
            childImageSharp {
                fixed(width: 125, height: 125) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        tamerPic: file(relativePath: { eq: "tamer.png" }) {
            childImageSharp {
                fixed(width: 125, height: 125) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        teamRocketGruntFPic: file(relativePath: { eq: "rocket_grunt_f.png" }) {
            childImageSharp {
                fixed(width: 125, height: 125) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        teamRocketGruntMPic: file(relativePath: { eq: "rocket_grunt_m.png" }) {
            childImageSharp {
                fixed(width: 125, height: 125) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        youngsterPic: file(relativePath: { eq: "youngster.png" }) {
            childImageSharp {
                fixed(width: 125, height: 125) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
    }
`
