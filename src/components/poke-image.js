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
                                fixed(width: 150, height: 150) {
                                    ...GatsbyImageSharpFixed
                                }
                            }
                        }
                    }
                }
            }
        }
    `);

    const image = data.allPokeImagesYaml.edges.find(n =>
        n.node.title === name
    );

    return (
        <Img
            alt={image.node.title}
            fixed={image.node.localFile.childImageSharp.fixed}
        />
    );
};

export default Image;
