import React, { createContext, useContext, useEffect, useState } from 'react';
import Purchases, { PurchasesStoreProduct } from 'react-native-purchases';

interface RevenueCatContextData {
  products: PurchasesStoreProduct[];
  purchasePackage: (product: PurchasesStoreProduct) => Promise<void>;
  restorePurchases: () => Promise<void>;
  user: {
    isPro: boolean;
  };
}

const RevenueCatContext = createContext<RevenueCatContextData | null>(null);

export const useRevenueCat = () => {
  const context = useContext(RevenueCatContext);
  if (!context) {
    throw new Error('useRevenueCat must be used within a RevenueCatProvider');
  }
  return context;
};

export const RevenueCatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<PurchasesStoreProduct[]>([]);
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      if (process.env.EXPO_PUBLIC_REVENUECAT_API_KEY) {
        await Purchases.configure({ apiKey: process.env.EXPO_PUBLIC_REVENUECAT_API_KEY });
        const offerings = await Purchases.getOfferings();
        if (offerings.current) {
          setProducts(offerings.current.availablePackages.map(pkg => pkg.product));
        }
      }
    };
    initialize();
  }, []);

  useEffect(() => {
    const customerInfoUpdateHandler = (customerInfo: any) => {
      setIsPro(customerInfo.entitlements.active.FoodLover_Pro !== undefined);
    };
    Purchases.addCustomerInfoUpdateListener(customerInfoUpdateHandler);
    return () => {
      Purchases.removeCustomerInfoUpdateListener(customerInfoUpdateHandler);
    };
  }, []);

  const purchasePackage = async (product: PurchasesStoreProduct) => {
    try {
      await Purchases.purchaseStoreProduct(product);
    } catch (e) {
      // handle error
    }
  };

  const restorePurchases = async () => {
    try {
      await Purchases.restorePurchases();
    } catch (e) {
      // handle error
    }
  };

  return (
    <RevenueCatContext.Provider
      value={{
        products,
        purchasePackage,
        restorePurchases,
        user: { isPro },
      }}
    >
      {children}
    </RevenueCatContext.Provider>
  );
};
