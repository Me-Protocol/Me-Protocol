# Me-Protocol SDK

A comprehensive React SDK for interacting with the Me Protocol ecosystem. This library provides easy-to-use functions for reward management, brand operations, liquidity provision, and blockchain interactions with built-in wallet authentication through Magic.

## Installation

Install the SDK and all its dependencies automatically:

```bash
npm install me-protocol
```

### Dependencies

The SDK automatically installs these required packages:
- `@developeruche/protocol-core` - Core protocol functionality
- `@developeruche/runtime-sdk` - Runtime operations 
- `@gelatonetwork/relay-sdk` - Transaction relay service
- `axios` - HTTP client
- `ethers` - Ethereum library
- `magic-sdk` - Wallet authentication
- `web3` - Web3 blockchain interactions

### Peer Dependencies

You'll also need React in your project:

```bash
npm install react
```

## Quick Start

### 1. Provider Setup

Wrap your app with the `MeProtocolProvider`:

```typescript
import React from 'react';
import { MeProtocolProvider } from 'me-protocol';

function App() {
  return (
    <MeProtocolProvider
      email="user@example.com"
      meApiKey="your-me-api-key"
      magicApiKey="your-magic-api-key"
      reqURL="https://api.meprotocol.com"
      OPEN_REWARD_DIAMOND="0x..." // Contract address
      OPEN_REWARD_IMPLEMENTATION="0x..." // Implementation address  
      JSON_RPC_URL="https://rpc.sepolia.org"
      ME_TOKEN="0x..." // ME token address
      CHAIN_ID={11155111} // Sepolia testnet
      TREASURY="0x..." // Treasury address
      VAULT="0x..." // Vault address
      GELATO_API_KEY="your-gelato-api-key"
      pk="your-private-key"
      hedera={false} // Set to true for Hedera network
      debug={true} // Enable debug mode
      costPayerId="optional-cost-payer-id"
    >
      <YourApp />
    </MeProtocolProvider>
  );
}
```

### 2. Using the Hook

Access Me Protocol functions in your components:

```typescript
import React from 'react';
import { useMeProtocol } from 'me-protocol';

function RewardManager() {
  const { 
    createReward, 
    setUpWallet,
    getBrandDetails,
    loading,
    error 
  } = useMeProtocol();

  const handleCreateReward = async () => {
    try {
      const result = await createReward({
        name: "MyReward",
        symbol: "MRW", 
        descriptionLink: "https://example.com/description",
        totalSupply: "1000000"
      });
      console.log('Reward created:', result);
    } catch (err) {
      console.error('Failed to create reward:', err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <button onClick={handleCreateReward}>
      Create Reward
    </button>
  );
}
```

## Core Features

### 🏪 Brand Management
- **Register & Setup**: Initialize brand accounts and wallets
- **Brand Details**: Retrieve and update brand information
- **Account Management**: Change main brand accounts
- **Configuration**: Update brand settings and policies

### 🎁 Reward Operations
- **Create Rewards**: Deploy new ERC20 reward tokens
- **Integrate Rewards**: Connect existing tokens to Me Protocol
- **Deploy with Pools**: Create rewards with liquidity pools
- **Lifecycle Management**: Activate, pause, and resume rewards

### 💰 Liquidity Management
- **Add Liquidity**: Provide liquidity to reward pools
- **Top Up**: Add more liquidity to existing pools
- **Auto-topup**: Automated liquidity management
- **Treasury Operations**: Manage treasury and vault funds

### 💸 Spending & Swapping
- **Same Brand Spending**: Spend rewards within issuing brand
- **Cross Brand Spending**: Spend rewards on different brands
- **Token Swapping**: Exchange different reward tokens
- **Vault Permits**: Secure spending with vault permissions

### 👥 User Management
- **Wallet Setup**: Initialize user wallets with Magic
- **Authentication**: Secure user authentication flow
- **Reward Distribution**: Send rewards to multiple recipients
- **Balance Queries**: Check user reward balances

### ⚙️ Configuration
- **Reward Settings**: Configure reward parameters
- **Open Reward Config**: Set up automated reward systems  
- **Brand Policies**: Manage brand-level configurations
- **Manager Roles**: Add/remove reward managers

## API Reference

### Wallet Operations

#### `setUpWallet({ persist })`
Initialize a user wallet with Magic authentication.

```typescript
const result = await setUpWallet({ persist: true });
```

#### `getWalletFromEmail({ userEmail, persist })`
Retrieve wallet information from email address.

```typescript
const wallet = await getWalletFromEmail({ 
  userEmail: "user@example.com", 
  persist: true 
});
```

### Brand Operations

#### `getBrandDetails({ getOnlyId })`
Get brand information or just the brand ID.

```typescript
const brandInfo = await getBrandDetails({ getOnlyId: false });
```

#### `changeMainAccount({ newMainAcctAddress })`
Update the main account address for a brand.

```typescript
await changeMainAccount({ 
  newMainAcctAddress: "0x..." 
});
```

### Reward Management

#### `createReward({ name, symbol, descriptionLink, totalSupply })`
Create a new ERC20 reward token.

```typescript
const result = await createReward({
  name: "My Reward Token",
  symbol: "MRT",
  descriptionLink: "https://example.com/description", 
  totalSupply: "1000000"
});
```

#### `deployRewardAndPool({ ... })`
Deploy a reward token with an associated liquidity pool.

```typescript
const result = await deployRewardAndPool({
  brandId: "123",
  name: "Pool Reward",
  symbol: "PRT",
  descriptionLink: "https://example.com",
  totalSupplyVault: ethers.utils.parseEther("500000"),
  totalSupplyTreasury: ethers.utils.parseEther("500000"),
  rOptimal: 100,
  maximumRLimit: 1000,
  minimumRewardAmountForConversation: ethers.utils.parseEther("1"),
  minimumMeAmountForConversation: ethers.utils.parseEther("1"),
  notifyRewardAmount: 100,
  notifyMeAmount: 100,
  persist: false
});
```

#### `integrateReward({ rewardAddress, descriptionLink, readTandC })`
Integrate an existing token into Me Protocol.

```typescript
await integrateReward({
  rewardAddress: "0x...",
  descriptionLink: "https://example.com/terms",
  readTandC: true
});
```

### Reward Lifecycle

#### `setUpOpenReward({ ... })`
Configure an open reward system.

```typescript
await setUpOpenReward({
  rewardAddress: "0x...",
  rOptimal: 100,
  maximumRLimit: 1000,
  minimumRewardAmountForConversation: 1,
  minimumMeAmountForConversation: 1,
  notifyRewardAmount: 100,
  notifyMeAmount: 100,
  defaultSlippageInPrecision: 500,
  allowSwaps: true
});
```

#### `activateOpenReward({ rewardAddress })`
Activate a configured open reward.

```typescript
await activateOpenReward({ rewardAddress: "0x..." });
```

#### `pauseOpenReward({ rewardAddress })`
Temporarily pause an active reward.

```typescript
await pauseOpenReward({ rewardAddress: "0x..." });
```

#### `resumeOpenReward({ rewardAddress })`
Resume a paused reward.

```typescript
await resumeOpenReward({ rewardAddress: "0x..." });
```

### Spending Operations

#### `spendRewardsOnIssuingBrandWithVaultPermit({ ... })`
Spend rewards on the issuing brand using vault permits.

```typescript
await spendRewardsOnIssuingBrandWithVaultPermit({
  reward_address: "0x...",
  reward_amount: ethers.utils.parseEther("10"),
  rewardId: "reward-123",
  RUNTIME_URL: "https://runtime.api.com",
  orderId: "order-456"
});
```

#### `spendRewardsOnAnotherBrandWithVaultPermit({ ... })`
Spend rewards on a different brand.

```typescript
await spendRewardsOnAnotherBrandWithVaultPermit({
  spendInfo: {
    rewardAtHand: "0x...",
    targettedReward: "0x...",
    amountOfRewardAtHand: ethers.utils.parseEther("10"),
    expectedAmountOfTargetedReward: ethers.utils.parseEther("8")
  },
  rewardId: "reward-123",
  RUNTIME_URL: "https://runtime.api.com"
});
```

#### `swapWithDiffBrand({ spendInfo })`
Swap tokens between different brands.

```typescript
await swapWithDiffBrand({
  spendInfo: {
    rewardAtHand: "0x...",
    targettedReward: "0x...", 
    amountOfRewardAtHand: ethers.utils.parseEther("10"),
    expectedAmountOfTargetedReward: ethers.utils.parseEther("8")
  }
});
```

### Liquidity Operations

#### `addLiquidityForOpenRewardsWithTreasuryAndMeDispenserAndStartPool({ ... })`
Add liquidity and start a new pool.

```typescript
await addLiquidityForOpenRewardsWithTreasuryAndMeDispenserAndStartPool({
  currentBrandId: "123",
  rewardAddress: "0x...",
  rewardAmount: "1000",
  meAmount: "1000", 
  persist: false
});
```

#### `topUpOpenRewardLiquidity({ rewardAmount, meAmount })`
Add more liquidity to existing pools.

```typescript
await topUpOpenRewardLiquidity({
  rewardAmount: "500",
  meAmount: "500"
});
```

### Distribution

#### `distributeRewards({ ... })`
Send rewards to multiple recipients.

```typescript
await distributeRewards({
  reward_address: "0x...",
  reward_recipient: ["0x...", "0x..."],
  reward_amounts: [
    ethers.utils.parseEther("10"),
    ethers.utils.parseEther("20")
  ],
  RUNTIME_URL: "https://runtime.api.com",
  persist: false
});
```

#### `onBoardRewards({ ... })`
Onboard rewards with default amounts.

```typescript
await onBoardRewards({
  brand_id: ethers.BigNumber.from("123"),
  reward_address: "0x...",
  persist: false,
  RUNTIME_URL: "https://runtime.api.com"
});
```

### Configuration Updates

#### `updateRewardConfig({ ... })`
Update reward-specific configuration.

```typescript
await updateRewardConfig({
  rewardConfig: {
    specificException: false,
    bountyEnables: true,
    caiEnabled: true,
    bountyTriggerLimit: 100,
    bountyContributionInPrecision: 500,
    payIncomingGasFee: true,
    payOutgoingGasFee: false
  },
  ignoreDefault: false,
  brandId: "123"
});
```

#### `updateBrandDetails({ ... })`
Update brand information.

```typescript
await updateBrandDetails({
  brandId: "123",
  brandDetails: {
    name: "New Brand Name",
    onlinePresence: "https://newwebsite.com"
  },
  ignoreDefault: false
});
```

### Utility Functions

#### `getUserRewardsRuntime({ ... })`
Get user reward balances from runtime.

```typescript
const balances = await getUserRewardsRuntime({
  rewardListFromBackend: rewardArray,
  userData: userObject,
  RUNTIME_URL: "https://runtime.api.com"
});
```

#### `logOut(clearCache)`
Log out the current user.

```typescript
await logOut(true); // Clear cache on logout
```

## State Management

The SDK provides loading states and error handling:

```typescript
const { 
  loading,        // Global loading state
  spendLoading,   // Spending operation loading
  spendingSteps,  // Multi-step spending progress
  error,          // Error state
  magic           // Magic instance for direct access
} = useMeProtocol();
```

## Error Handling

All functions throw errors that should be caught:

```typescript
try {
  await createReward({ /* params */ });
} catch (error) {
  if (error instanceof Error) {
    console.error('Operation failed:', error.message);
  }
}
```

## Network Support

The SDK supports multiple networks:
- **Ethereum**: Mainnet and testnets
- **Hedera**: Set `hedera: true` in provider props
- **Custom Networks**: Configure via RPC URL and Chain ID

## TypeScript Support

The SDK is written in TypeScript and provides full type definitions for all functions and interfaces.

## Examples

Check out our [examples repository](https://github.com/me-protocol/examples) for complete implementation examples including:
- Brand registration flows
- Reward marketplace integration  
- Multi-brand spending applications
- Liquidity provider dashboards

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

ISC License - see [LICENSE](LICENSE) file for details.

## Support

- 📧 Email: support@meprotocol.com
- 💬 Discord: [Me Protocol Community](https://discord.gg/meprotocol)
- 📖 Documentation: [docs.meprotocol.com](https://docs.meprotocol.com)
- 🐛 Issues: [GitHub Issues](https://github.com/me-protocol/sdk/issues)
