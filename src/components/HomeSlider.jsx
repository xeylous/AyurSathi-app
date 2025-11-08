import React, { useRef } from "react";
import {
  View,
  Text,
  Dimensions,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { Shield, Leaf, DollarSign, QrCode, Sprout, Users, Award, CheckCircle } from "lucide-react-native";

const { width } = Dimensions.get("window");

const slides = [
  {
    id: 1,
    icon: Shield,
    slogan: "Authenticity",
    vector: Sprout,
  },
  {
    id: 2,
    icon: Leaf,
    slogan: "Transparency",
    vector: CheckCircle,
  },
  {
    id: 3,
    icon: DollarSign,
    slogan: "Fair Pricing",
    vector: Users,
  },
  {
    id: 4,
    icon: QrCode,
    slogan: "Consumer Trust",
    vector: Award,
  },
];

const HeroSlider = () => {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const renderItem = ({ item }) => {
    const IconComponent = item.icon;
    const VectorComponent = item.vector;
    return (
      <View style={{ width, borderBottomLeftRadius: 60, borderBottomRightRadius: 60, top: -10 }} className="bg-[#90A955] relative overflow-hidden">
        {/* Large decorative vector in background */}
        <View style={{ 
          position: 'absolute', 
          right: 10, 
          bottom: 10,
          opacity: 0.15 
        }}>
          <VectorComponent size={100} color="#ffffff" />
        </View>

        <View style={{ 
          paddingVertical: 32,
          paddingHorizontal: 24,
          zIndex: 10,
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* Icon */}
            <View style={{ 
              backgroundColor: 'rgba(255,255,255,0.3)', 
              width: 60, 
              height: 60, 
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 16,
            }}>
              <IconComponent size={30} color="#ffffff" />
            </View>

            {/* Slogan and Dots */}
            <View style={{ flex: 1 }}>
              <Text style={{ 
                fontSize: 24, 
                fontWeight: 'bold', 
                color: '#ffffff',
                marginBottom: 8,
              }}>
                {item.slogan}
              </Text>

              {/* Pagination Dots below slogan */}
              <View className="flex-row items-center gap-1.5">
                {slides.map((_, index) => (
                  <View
                    key={index}
                    style={{
                      height: 6,
                      width: currentIndex === index ? 20 : 6,
                      borderRadius: 3,
                      backgroundColor: currentIndex === index ? "#ffffff" : "rgba(255,255,255,0.4)",
                    }}
                  />
                ))}
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View className="bg-[#ECF39E]/30">
      <Carousel
        ref={carouselRef}
        loop
        width={width}
        height={120}
        autoPlay={true}
        data={slides}
        scrollAnimationDuration={800}
        autoPlayInterval={3500}
        onSnapToItem={(index) => setCurrentIndex(index)}
        renderItem={renderItem}
      />
    </View>
  );
};

export default HeroSlider;