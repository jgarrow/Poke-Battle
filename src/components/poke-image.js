import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

const Image = ({ name }) => {
    const data = useStaticQuery(graphql`
        {
            allPokeImagesYaml {
                edges {
                    node {
                        title
                        localFile {
                            childImageSharp {
                                fluid(maxWidth: 150) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                }
            }
        }
    `);

    const image = data.allPokeImagesYaml.edges.find(n => n.node.title === name);

    return (
        <Img
            alt={image.node.title}
            fluid={image.node.localFile.childImageSharp.fluid}
        />
    );
};

export default Image;
