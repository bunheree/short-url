'use client'
import { MantineProvider, CopyButton, ActionIcon, rem } from '@mantine/core'
import { IconCopy, IconCheck } from '@tabler/icons-react'

export function BunCopyButton({ linkValue }) {

    return (
        <>
            <MantineProvider defaultColorScheme="dark" forceColorScheme="light">
                <CopyButton value={linkValue} timeout={2000} >
                    {({ copied, copy }) => (
                        <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
                            {copied ? (
                                <IconCheck style={{ width: rem(16) }} />
                            ) : (
                                <IconCopy style={{ width: rem(16) }} />
                            )}
                        </ActionIcon>
                    )}
                </CopyButton>
            </MantineProvider>
        </>
    )
}