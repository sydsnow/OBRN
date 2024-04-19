// import Carousel from "../components/Carousel";
import HomeBanner from "../components/HomeBanner";
import HomeServices from "../components/HomeServices";
import HomeDeals from "../components/HomeDeals";

function HomePage () {
    return (
        <main className="main">
        {/* <Carousel /> */}
        <HomeBanner />
        <HomeServices />
        <HomeDeals />

        </main>
    )
}

export default HomePage;