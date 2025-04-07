import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Text,
  Theme,
} from '@radix-ui/themes';
import { ConnectButton, useCurrentAccount } from '@mysten/dapp-kit';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import { CreateAllowlist } from './CreateAllowlist';
import { Allowlist } from './Allowlist';
import WalrusUpload from './EncryptAndUpload';
import { CreateService } from './CreateSubscriptionService';
import FeedsToSubscribe from './SubscriptionView';
import { Service } from './SubscriptionService';
import { AllAllowlist } from './OwnedAllowlists';
import { AllServices } from './OwnedSubscriptionServices';
import Feeds from './AllowlistView';

function LandingPage() {
  return (
    <Grid columns="2" gap="4">
      <Card size="3" style={{ backgroundColor: '#1e1e2f', color: 'white' }}>
        <Flex direction="column" gap="3" align="center" style={{ height: '100%' }}>
          <Box style={{ textAlign: 'center' }}>
            <Text size="5" weight="bold">Allowlist Example</Text>
            <Text>
              Shows how a creator can define an allowlist based access. Only users in the list
              can decrypt the files.
            </Text>
          </Box>
          <Link to="/allowlist-example">
            <Button size="3" color="gray" variant="surface">Try it</Button>
          </Link>
        </Flex>
      </Card>
      <Card size="3" style={{ backgroundColor: '#1e1e2f', color: 'white' }}>
        <Flex direction="column" gap="3" align="center" style={{ height: '100%' }}>
          <Box style={{ textAlign: 'center' }}>
            <Text size="5" weight="bold">Subscription Example</Text>
            <Text>
              Subscription-based access to encrypted files. Users must have valid subscription NFT.
            </Text>
          </Box>
          <Link to="/subscription-example">
            <Button size="3" color="gray" variant="surface">Try it</Button>
          </Link>
        </Flex>
      </Card>
    </Grid>
  );
}

function App() {
  const currentAccount = useCurrentAccount();
  const [recipientAllowlist, setRecipientAllowlist] = useState<string>('');
  const [capId, setCapId] = useState<string>('');

  return (
    <Theme appearance="dark">
      <Container size="3">
        <Flex position="sticky" px="4" py="3" justify="between" align="center" style={{ backgroundColor: '#121212' }}>
          <Text size="6" weight="bold" color="gray">
            Seal Example Apps
          </Text>
          <ConnectButton />
        </Flex>

        <Card size="3" style={{ backgroundColor: '#1e1e2f', color: 'white', marginBottom: '2rem' }}>
          <Text>
            1. Code is available{' '}
            <a href="https://github.com/MystenLabs/seal/tree/main/examples" target="_blank" rel="noreferrer">
              here
            </a>.
          </Text>
          <Text>
            2. These examples are for Testnet only. Get some SUI from{' '}
            <a href="https://faucet.sui.io/" target="_blank" rel="noreferrer">
              faucet.sui.io
            </a>.
          </Text>
          <Text>
            3. Blobs on Walrus Testnet last for 1 epoch. Old files cannot be retrieved.
          </Text>
          <Text>
            4. Currently only image files are supported. UI is minimal and for demo purposes only!
          </Text>
        </Card>

        {currentAccount ? (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route
                path="/allowlist-example/*"
                element={
                  <Routes>
                    <Route path="/" element={<CreateAllowlist />} />
                    <Route
                      path="/admin/allowlist/:id"
                      element={
                        <div>
                          <Allowlist setRecipientAllowlist={setRecipientAllowlist} setCapId={setCapId} />
                          <WalrusUpload
                            policyObject={recipientAllowlist}
                            cap_id={capId}
                            moduleName="allowlist"
                          />
                        </div>
                      }
                    />
                    <Route path="/admin/allowlists" element={<AllAllowlist />} />
                    <Route
                      path="/view/allowlist/:id"
                      element={<Feeds suiAddress={currentAccount.address} />}
                    />
                  </Routes>
                }
              />
              <Route
                path="/subscription-example/*"
                element={
                  <Routes>
                    <Route path="/" element={<CreateService />} />
                    <Route
                      path="/admin/service/:id"
                      element={
                        <div>
                          <Service setRecipientAllowlist={setRecipientAllowlist} setCapId={setCapId} />
                          <WalrusUpload
                            policyObject={recipientAllowlist}
                            cap_id={capId}
                            moduleName="subscription"
                          />
                        </div>
                      }
                    />
                    <Route path="/admin/services" element={<AllServices />} />
                    <Route
                      path="/view/service/:id"
                      element={<FeedsToSubscribe suiAddress={currentAccount.address} />}
                    />
                  </Routes>
                }
              />
            </Routes>
          </BrowserRouter>
        ) : (
          <Text>Please connect your wallet to continue</Text>
        )}
      </Container>
    </Theme>
  );
}

export default App;
