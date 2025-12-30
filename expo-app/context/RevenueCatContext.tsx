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

let lastOfferingsFetch = 0;
let offeringsFetchInFlight: Promise<void> | null = null;

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
    let cancelled = false;

    const fetchOfferingsThrottled = async () => {
      // throttle offerings fetch to at most once every 5 minutes
      const now = Date.now();

      // If a fetch is already in flight, wait for it and bail
      if (offeringsFetchInFlight) {
        await offeringsFetchInFlight;
        return;
      }

      if (now - lastOfferingsFetch < 5 * 60 * 1000) {
        return;
      }

      offeringsFetchInFlight = (async () => {
        try {
          const offerings = await Purchases.getOfferings();
          if (!cancelled && offerings.current) {
            setProducts(offerings.current.availablePackages.map((pkg) => pkg.product));
          }
          lastOfferingsFetch = Date.now();
        } catch (_e) {
          // ignore fetch errors here; UI can trigger a manual refresh when needed
        } finally {
          offeringsFetchInFlight = null;
        }
      })();

      await offeringsFetchInFlight;
    };

    fetchOfferingsThrottled();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const customerInfoUpdateHandler = (customerInfo: any) => {
      setIsPro(customerInfo.entitlements.active.unlock !== undefined);
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
