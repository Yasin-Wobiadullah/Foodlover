import { ThemedText } from '@/components/ui/themed-text';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Image, View, ScrollView } from 'react-native';
import { Link, useRouter } from 'expo-router';
import CircularButton from '@/components/ui/circular-button';
import { Button } from '@/components/ui/button';
import RecipeCarousel from '@/components/recipe/RecipeCarousel';
import RecipeSnapCarousel from '@/components/recipe/RecipeSnapCarousel';
import ParallaxScrollView from '@/components/ui/parallax-scroll-view';

const portraitRecipes = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Creamy one-pot French onion pasta',
    author: 'Paul Breuer',
    authorImageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
    cookTime: '50 min.',
    likes: '1.12K',
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Juicy air fryer salmon and vegetables',
    author: 'Marco Hartz',
    authorImageUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
    cookTime: '20 min.',
    likes: '449',
  },
  // Add more recipes as needed
];

const landscapeRecipes = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1484723050470-2a5b5d388a4b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Juicy air fryer salmon and vegetables',
    author: 'Marco Hartz',
    authorImageUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
    cookTime: '20 min.',
    likes: '449',
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=1910&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Creamy one-pot French onion pasta',
    author: 'Paul Breuer',
    authorImageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
    cookTime: '50 min.',
    likes: '1.12K',
  },
  // Add more recipes as needed
];

export default function HomeScreen() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ParallaxScrollView
        headerImage={
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=1980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
            style={{ width: '100%', height: '100%' }}
          />
        }>
        <View style={styles.contentOuterContainer}>
          <View style={styles.contentContainer}>
            <ThemedText variant="h4" className="text-gray-500">{t('todaysRecipe')}</ThemedText>
            <ThemedText variant="h1" className="my-2">{t('handbrot')}</ThemedText>
            <ThemedText variant="body" className="text-gray-500">{t('marcoHartz')}</ThemedText>
            <View style={styles.buttonContainer}>
              <Button title="7.19K" variant="filter" />
              <CircularButton icon="add" onPress={() => {}} size={64} />
            </View>
          </View>

          <View style={{ marginVertical: 24 }}>
            <ThemedText variant="h2" className="mb-4 px-4">{t('latestRecipes')}</ThemedText>
            <RecipeCarousel recipes={portraitRecipes} />
          </View>

          <View style={{ marginVertical: 24 }}>
            <ThemedText variant="h2" className="mb-4 px-4">{t('popularRecipes')}</ThemedText>
            <RecipeSnapCarousel recipes={landscapeRecipes} />
          </View>
        </View>
      </ParallaxScrollView>
      <View style={styles.header}>
        <Link href="/(app)/(modals)/profile" asChild>
          <CircularButton icon="account-circle" onPress={() => router.push('/(app)/(modals)/profile')} />
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 10,
  },
  contentOuterContainer: {
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
  },
});
