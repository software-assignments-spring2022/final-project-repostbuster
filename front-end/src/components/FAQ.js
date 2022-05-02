import React from "react";
import "../styles.css"

function FAQ() {
    return (
        <div id = "content">
            <h1>Frequently Asked Questions</h1>

            <h3>I found one of my images being used without my permission by someone else. What should I do?</h3>
            <p>What you decide to do at this point is up to you.</p>
            <p>You can can try to directly contact the person who reposted your image. If the image was reposted on a social media platform like Twitter, Instagram, or Facebook, you will most likely be able to submit a copyright complaint directly on these sites to have the reposted image be taken down. </p>
            <p>Bellow are links to guides on how to file a copyright complaint on some popular social media platforms:</p>

            <li>
                <a href="https://help.twitter.com/en/rules-and-policies/copyright-policy">Twitter's Copyright Policy</a>
            </li>
            <li>
                <a href="https://help.instagram.com/126382350847838">Instagram's Copyright Policy</a>
            </li>

            <h3>Why is RepostBuster unable to find any reposted instances of the image I uploaded?</h3>
            <p>Your image has mostlikely not been reuploaded elsewhere on the internet. Which is a good thing!</p>

            <h3>RepostBuster is only returning images similar to the one I uploaded and isn't finding exact matches. Why?</h3>
            <p></p>

            <h2>Troubleshooting</h2>
            <h3>X functionality on RepostBuster isn't working properly. What Should I do?</h3>
            <p>If you're having a problem with RepostBuster that is not addressed here, please contact us at [EMAIL].</p>
        </div>


    );
}

export default FAQ;
