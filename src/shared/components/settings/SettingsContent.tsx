"use client";

import AddIcon from "@mui/icons-material/Add";
import TelegramIcon from "@mui/icons-material/Telegram";
import {
  Alert,
  Box,
  Button,
  Collapse,
  Container,
  Tab,
  Tabs,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ReactNode, SyntheticEvent, useEffect, useState } from "react";

import {
  BindCodeResponse,
  useBindMutation,
  useUnbindMutation,
} from "@/services/useBindingQuery";
import {
  CreateSubscriptionRequest,
  UpdateSubscriptionRequest,
  useCreateSubscriptionMutation,
  useDeleteSubscriptionMutation,
  useSubscriptionQuery,
  useUpdateSubscriptionMutation,
} from "@/services/useSubscriptionQuery";
import { useUserQuery } from "@/services/useUserQuery";

import BindingCard from "./BindingCard";
import BindingModal from "./BindingModal";
import SubscriptionCard from "./SubscriptionCard";

/**
 * Subscription limits by role
 * -1 means unlimited
 */
const SUBSCRIPTION_LIMITS: Record<string, number> = {
  admin: -1,
  user: 3,
};

const DEFAULT_LIMIT = 3;

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

const TabPanel = ({ children, value, index }: TabPanelProps) => {
  return (
    <Box role="tabpanel" hidden={value !== index} sx={{ py: 3 }}>
      {value === index && children}
    </Box>
  );
};

/**
 * Settings page content component (client-side)
 */
const SettingsContent = () => {
  const router = useRouter();
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  const [tabIndex, setTabIndex] = useState(0);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [bindModalOpen, setBindModalOpen] = useState(false);
  const [bindData, setBindData] = useState<BindCodeResponse | null>(null);

  // Redirect to home if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  const { data: user } = useUserQuery(isAuthenticated);
  const { mutate: bind, isPending: isBinding } = useBindMutation();
  const { mutate: unbind, isPending: isUnbinding } = useUnbindMutation();

  const { data: subscriptions = [] } = useSubscriptionQuery(isAuthenticated);
  const { mutate: createSubscription, isPending: isCreating } =
    useCreateSubscriptionMutation();
  const { mutate: updateSubscription, isPending: isUpdating } =
    useUpdateSubscriptionMutation();
  const { mutate: deleteSubscription, isPending: isDeleting } =
    useDeleteSubscriptionMutation();

  const handleTabChange = (_: SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleBind = () => {
    bind("telegram", {
      onSuccess: (data) => {
        setBindData(data);
        setBindModalOpen(true);
      },
    });
  };

  const handleCloseBindModal = () => {
    setBindModalOpen(false);
    setBindData(null);
  };

  const handleUnbind = () => {
    unbind("telegram");
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
  };

  const handleCancelNew = () => {
    setIsAddingNew(false);
  };

  const handleCreateSubscription = (data: CreateSubscriptionRequest) => {
    createSubscription(data, {
      onSuccess: () => {
        setIsAddingNew(false);
      },
    });
  };

  const handleUpdateSubscription = (
    id: number,
    data: UpdateSubscriptionRequest,
  ) => {
    updateSubscription({ id, data });
  };

  const handleDeleteSubscription = (id: number) => {
    deleteSubscription(id);
  };

  const userRole = user?.role ?? "user";
  const maxSubscriptions = SUBSCRIPTION_LIMITS[userRole] ?? DEFAULT_LIMIT;
  const hasAnyBinding = user?.bindings?.telegram ?? false;
  const canAddMore =
    hasAnyBinding &&
    (maxSubscriptions === -1 || subscriptions.length < maxSubscriptions);

  // Show nothing while checking auth status or redirecting
  if (status === "loading" || status === "unauthenticated") {
    return null;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabIndex} onChange={handleTabChange}>
          <Tab label="條件設定" />
          <Tab label="綁定" />
        </Tabs>
      </Box>

      <TabPanel value={tabIndex} index={0}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {!hasAnyBinding && (
            <Alert severity="warning">請先綁定任一通訊軟體才能新增訂閱</Alert>
          )}

          {subscriptions.map((subscription, index) => (
            <SubscriptionCard
              key={subscription.id}
              index={index}
              subscription={subscription}
              isLoading={isUpdating || isDeleting}
              onSave={handleCreateSubscription}
              onUpdate={handleUpdateSubscription}
              onDelete={handleDeleteSubscription}
            />
          ))}

          <Collapse in={isAddingNew} timeout={300}>
            <Box sx={{ mt: subscriptions.length > 0 ? 0 : 0, mb: 2 }}>
              <SubscriptionCard
                index={subscriptions.length}
                isNew
                isLoading={isCreating}
                onSave={handleCreateSubscription}
                onCancel={handleCancelNew}
              />
            </Box>
          </Collapse>

          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleAddNew}
            disabled={!canAddMore || isAddingNew}
            sx={{ alignSelf: "flex-start" }}
          >
            新增訂閱
            {!hasAnyBinding && " (請先綁定通訊軟體)"}
            {hasAnyBinding &&
              maxSubscriptions !== -1 &&
              subscriptions.length >= maxSubscriptions &&
              ` (已達上限 ${maxSubscriptions} 組)`}
          </Button>
        </Box>
      </TabPanel>

      <TabPanel value={tabIndex} index={1}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <BindingCard
            serviceName="Telegram"
            icon={<TelegramIcon sx={{ fontSize: 40, color: "#0088cc" }} />}
            isBinding={user?.bindings?.telegram ?? false}
            isLoading={isBinding || isUnbinding}
            color="#0088cc"
            hoverColor="#006699"
            onBind={handleBind}
            onUnbind={handleUnbind}
          />
        </Box>
      </TabPanel>

      {/* Binding Modal */}
      {bindData && (
        <BindingModal
          open={bindModalOpen}
          onClose={handleCloseBindModal}
          bindUrl={bindData.bind_url.split("?start=")[0]}
          bindCode={bindData.bind_code}
        />
      )}
    </Container>
  );
};

export default SettingsContent;
